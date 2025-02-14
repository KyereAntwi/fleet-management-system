namespace Odatey.FleetManagementSystem.Application.Features.Tenants.Commands;

public record CreateATenantCommand(
    string UserId,
    Subscription Subscription) : ICommand<string>;

public class CreateATenantCommandHandler(
    ITenantRepository repository,
    IAsyncRepository<Workspace> workspacesRepository,
    TenantDatabaseSettings databaseSettings) 
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
        var newTenant = Tenant.Create("", connectionString, command.Subscription);
        
        await repository.CreateAsync(newTenant);
        
        var newWorkspace = Workspace.Create(
            WorkspaceId.Of(Guid.NewGuid()),
            "Default Workspace");
            
        await workspacesRepository.AddAsync(newWorkspace);
        await workspacesRepository.SaveChangesAsync();

        return newTenant.UserId;
    }
}