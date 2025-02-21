namespace Odatey.FleetManagementSystem.Application.Features.Tenants.Commands;

public record CreateATenantCommand(
    string UserId,
    Subscription Subscription) : ICommand<string>;

public class CreateATenantCommandHandler(
    ITenantRepository repository,
    IAsyncRepository<Workspace> workspacesRepository,
    TenantDatabaseSettings databaseSettings,
    ILogger<CreateATenantCommandHandler> logger) 
    : ICommandHandler<CreateATenantCommand, string>
{
    public async Task<string> Handle(CreateATenantCommand command, CancellationToken cancellationToken)
    {
        var existingTenant = await repository.GetTenantByUserIdAsync(command.UserId);

        if (existingTenant is not null)
        {
            throw new BadRequestException($"Tenant '{command.UserId}' already exists.");
        }

        var newDatabase = Guid.NewGuid().ToString();
        
        var connectionString =
            $"Host={databaseSettings.Server};Port={databaseSettings.Port};Database={newDatabase};User Id={databaseSettings.Username};Password={databaseSettings.Password};";
        var newTenant = Tenant.Create(command.UserId, connectionString, command.Subscription);

        await repository.CreateAsync(newTenant);
        
        try
        {
            await repository.GenerateTenantDatabase(newDatabase);
            await repository.ApplyMigrationAsync(connectionString);
        }
        catch (Exception e)
        {
            await repository.DeleteTenantAsync(newTenant.Id.Value);
            
            logger.LogError(e, "Error creating new tenant");
            throw new Exception("Error creating new tenant");
        }

        return newTenant.Id.Value.ToString();
    }
}