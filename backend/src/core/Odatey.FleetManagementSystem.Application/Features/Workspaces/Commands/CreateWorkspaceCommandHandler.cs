namespace Odatey.FleetManagementSystem.Application.Features.Workspaces.Commands;

public record CreateWorkspaceCommand(string Title) : ICommand<CreateWorkspaceResponse>;

public class CreateWorkspaceCommandHandler(IAsyncRepository<Workspace> context)
    : ICommandHandler<CreateWorkspaceCommand, CreateWorkspaceResponse>
{
    public async Task<CreateWorkspaceResponse> Handle(CreateWorkspaceCommand command, CancellationToken cancellationToken)
    {
        //TODO - check to make sure permission is granted for creating workspace

        var workspace = CreateWorkspace(command);
        await context.AddAsync(workspace);
        await context.SaveChangesAsync();

        return new CreateWorkspaceResponse(workspace.Id.Value);
    }

    private Workspace CreateWorkspace(CreateWorkspaceCommand command)
    {
        return Workspace.Create(
            WorkspaceId.Of(Guid.NewGuid()),
            command.Title,
            Guid.NewGuid().ToString()); //TODO - Replace with tenant id
    }
}

public record CreateWorkspaceResponse(Guid Id);