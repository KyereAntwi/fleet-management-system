namespace Odatey.FleetManagementSystem.Application.Features.Workspaces.Queries;

public record GetSingleWorkspacesQuery(Guid Id) : IQuery<WorkspaceResponse>;

public class GetSingleWorkspacesQueryHandler(IWorkspaceRepository context)
    : IQueryHandler<GetSingleWorkspacesQuery, WorkspaceResponse>
{
    public async Task<WorkspaceResponse> Handle(GetSingleWorkspacesQuery query, CancellationToken cancellationToken)
    {
        var workspace = await context.GetByIdAsync(query.Id) ??
         throw new NotFoundException($"Workspace with id {query.Id} does not exist.");

        return new WorkspaceResponse(
            workspace.Id.Value,
            workspace.WorkspaceTitle,
            workspace.CreatedAt,
            workspace.UpdatedAt,
            workspace.CreatedBy,
            workspace.UpdatedBy);
    }
}