namespace Odatey.FleetManagementSystem.Application.Features.Workspaces.Queries;

public record GetAllWorkspacesQuery : IQuery<IEnumerable<WorkspaceResponse>>;

public class GetAllWorkspacesQueryHandler(IAsyncRepository<Workspace> context)
    : IQueryHandler<GetAllWorkspacesQuery, IEnumerable<WorkspaceResponse>>
{
    public async Task<IEnumerable<WorkspaceResponse>> Handle(GetAllWorkspacesQuery query, CancellationToken cancellationToken)
    {
        var workspaces = await context
            .ListAllAsync();

        return workspaces
            .Select(s => new WorkspaceResponse(s.Id.Value, s.WorkspaceTitle, s.CreatedAt, s.UpdatedAt, s.CreatedBy, s.UpdatedBy));
    }
}

public record WorkspaceResponse(
    Guid Id,
    string WorkspaceTitle,
    DateTime? CreatedAt,
    DateTime? UpdatedAt,
    string? CreatedBy,
    string? UpdatedBy);