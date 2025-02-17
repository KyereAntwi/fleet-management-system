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
        var existingTenant = await repository.GetTenantAsync(command.UserId);

        if (existingTenant is not null)
        {
            throw new BadRequestException($"Tenant '{command.UserId}' already exists.");
        }
            
        var connectionString = $"Server={databaseSettings.Server};Database={command.UserId};User Id={databaseSettings.Username};Password={databaseSettings.Password};";
        var newTenant = Tenant.Create(command.UserId, connectionString, command.Subscription);

        try
        {
            await GenerateTenantDatabase(command.UserId);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error creating new tenant");
            throw new Exception("Error creating new tenant");
        }
        
        await repository.CreateAsync(newTenant);
        
        var newWorkspace = Workspace.Create(
            WorkspaceId.Of(Guid.NewGuid()),
            "Default Workspace");
            
        await workspacesRepository.AddAsync(newWorkspace);
        await workspacesRepository.SaveChangesAsync();

        return newTenant.UserId;
    }

    private async Task GenerateTenantDatabase(string tenantId)
    {
        var masterConnectionString = databaseSettings.MasterConnectionString;

        await using var masterConnection = new SqlConnection(masterConnectionString);
        await masterConnection.OpenAsync();
        var command = masterConnection.CreateCommand();
        command.CommandText = $"IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '{tenantId}') CREATE DATABASE [{tenantId}]";
        await command.ExecuteNonQueryAsync();
    }
}