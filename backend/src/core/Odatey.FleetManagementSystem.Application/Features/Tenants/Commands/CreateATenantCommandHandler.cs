using Odatey.FleetManagementSystem.Application.Interfaces.Services;

namespace Odatey.FleetManagementSystem.Application.Features.Tenants.Commands;

public record CreateATenantCommand(
    Subscription Subscription) : ICommand<string>;

public class CreateATenantCommandHandler(
    ITenantRepository repository,
    TenantDatabaseSettings databaseSettings,
    ILogger<CreateATenantCommandHandler> logger,
    IAuthenticatedUser authenticatedUser) 
    : ICommandHandler<CreateATenantCommand, string>
{
    public async Task<string> Handle(CreateATenantCommand command, CancellationToken cancellationToken)
    {
        var existingTenant = await repository.GetTenantByUserIdAsync(authenticatedUser.UserId!);

        if (existingTenant is not null)
        {
            throw new BadRequestException($"Tenant '{authenticatedUser.UserId}' already exists.");
        }

        var newDatabase = authenticatedUser.UserId!;
        
        var connectionString =
            $"Host={databaseSettings.Server};Port={databaseSettings.Port};Database={newDatabase};User Id={databaseSettings.Username};Password={databaseSettings.Password};SSL Mode=Require;Trust Server Certificate=true;";
        var newTenant = Tenant.Create(authenticatedUser.UserId!, connectionString, command.Subscription);

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