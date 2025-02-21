namespace Odatey.FleetManagementSystem.Application.Features.Workspaces.Commands;

public record CreateWorkspaceCommand(string Title, string TenantId) : ICommand<CreateWorkspaceResponse>;

public class CreateWorkspaceCommandHandler(
    IAsyncRepository<Workspace> context,
    ITenantRepository tenantRepository)
    : ICommandHandler<CreateWorkspaceCommand, CreateWorkspaceResponse>
{
    public async Task<CreateWorkspaceResponse> Handle(CreateWorkspaceCommand command, CancellationToken cancellationToken)
    {
        var existingTenant = await tenantRepository.GetTenantAsync(command.TenantId);

        if (existingTenant == null)
        {
            throw new NotFoundException($"Tenant {command.TenantId} does not exist.");
        }
        
        // var existingUser = existingTenant.ApplicationUsers.FirstOrDefault(u => u.UserId == command.TenantId);
        // if (existingUser is null)
        // {
        //     throw new BadRequestException($"User {command.UserId} does not belong to tenant with id {existingTenant.Id.Value}");
        // }

        if (existingTenant.Subscription == Subscription.Free)
        {
            var workspaces = await context.ListAllAsync();
            if (workspaces.Any())
            {
                throw new BadRequestException("You are currently on a free subscription and can manage only one workspace.");
            }
        }
        
        var workspace = CreateWorkspace(command);
        await context.AddAsync(workspace);
        await context.SaveChangesAsync();

        return new CreateWorkspaceResponse(workspace.Id.Value);
    }

    private Workspace CreateWorkspace(CreateWorkspaceCommand command)
    {
        return Workspace.Create(
            WorkspaceId.Of(Guid.NewGuid()), command.Title);
    }
}

public record CreateWorkspaceResponse(Guid Id);