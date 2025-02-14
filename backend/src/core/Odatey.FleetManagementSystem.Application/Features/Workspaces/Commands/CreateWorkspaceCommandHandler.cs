namespace Odatey.FleetManagementSystem.Application.Features.Workspaces.Commands;

public record CreateWorkspaceCommand(string Title, string UserId) : ICommand<CreateWorkspaceResponse>;

public class CreateWorkspaceCommandHandler(
    IAsyncRepository<Workspace> context,
    ITenantRepository tenantRepository)
    : ICommandHandler<CreateWorkspaceCommand, CreateWorkspaceResponse>
{
    public async Task<CreateWorkspaceResponse> Handle(CreateWorkspaceCommand command, CancellationToken cancellationToken)
    {
        var existingTenant = await tenantRepository.GetTenantAsync(command.UserId);

        if (existingTenant == null)
        {
            throw new NotFoundException($"Tenant {command.UserId} does not exist.");
        }

        if (existingTenant.Subscription == Subscription.Free)
        {
            throw new BadRequestException("You are currently on a free subscription and can only manage only one workspace.");
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