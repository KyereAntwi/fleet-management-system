namespace Odatey.FleetManagementSystem.Application.Features.Workspaces.Commands;

public record DeleteWorkspaceCommand(Guid WorkspaceId) : ICommand;

public class DeleteWorkspaceCommandHandler(
    IWorkspaceRepository workspaceRepository,
    IAsyncRepository<Workspace> asyncRepository) 
    : ICommandHandler<DeleteWorkspaceCommand, Unit>
{
    public async Task<Unit> Handle(DeleteWorkspaceCommand command, CancellationToken cancellationToken)
    {
        var existingWorkspace = await workspaceRepository.GetByIdAsync(command.WorkspaceId);

        if (existingWorkspace is null)
        {
            throw new NotFoundException("Workspace not found");
        }
        
        await asyncRepository.DeleteAsync(existingWorkspace);
        await asyncRepository.SaveChangesAsync();
        
        return Unit.Value;
    }
}