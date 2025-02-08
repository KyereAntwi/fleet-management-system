namespace Odatey.FleetManagementSystem.Application.Features.Workspaces.Queries;

public record GetSingleWorkspacesQuery(Guid Id) : IQuery<WorkspaceResponse>;

internal sealed class GetSingleWorkspacesQueryHandler(IApplicationDbContext context) 
    : IQueryHandler<GetSingleWorkspacesQuery, WorkspaceResponse>
{
    public async Task<WorkspaceResponse> Handle(GetSingleWorkspacesQuery query, CancellationToken cancellationToken)
    {
        var workspace = await context.Workspaces.FindAsync(query.Id, cancellationToken);

        if (workspace is null)
        {
            throw new NotFoundException($"Workspace with id {query.Id} does not exist.");
        }

        return new WorkspaceResponse(
            workspace.Id.Value,
            workspace.WorkspaceTitle,
            workspace.CreatedAt,
            workspace.UpdatedAt,
            workspace.CreatedBy,
            workspace.UpdatedBy);
    }
}