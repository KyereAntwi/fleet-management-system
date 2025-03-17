namespace Odatey.FleetManagementSystem.Application.Features.Workspaces.Commands;

public record UpdateWorkspaceCommand(
    Guid Id,
    string Title) : ICommand;

public class UpdateWorkspaceCommandHandler(IAsyncRepository<Workspace> context, IWorkspaceRepository workspaceRepository)
    : ICommandHandler<UpdateWorkspaceCommand>
{
    public async Task<Unit> Handle(UpdateWorkspaceCommand command, CancellationToken cancellationToken)
    {
        var workspaceId = WorkspaceId.Of(command.Id);
        var workspace = await workspaceRepository.GetByIdAsync(workspaceId.Value);

        if (workspace is null)
        {
            throw new NotFoundException($"Workspace with id {workspaceId} does not exist");
        }

        workspace.Update(command.Title);
        await context.SaveChangesAsync();

        return Unit.Value;
    }
}