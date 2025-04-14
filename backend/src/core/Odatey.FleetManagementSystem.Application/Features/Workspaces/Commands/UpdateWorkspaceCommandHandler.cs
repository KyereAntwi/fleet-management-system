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
        
        var existingTitle = await workspaceRepository.GetByTitleAsync(command.Title);
        if (existingTitle is not null)
        {
            throw new BadRequestException($"Workspace with title {command.Title} already exists");
        }
        
        if (workspace.WorkspaceTitle == command.Title)
        {
            return Unit.Value;
        }

        workspace.Update(command.Title);
        await context.SaveChangesAsync();

        return Unit.Value;
    }
}