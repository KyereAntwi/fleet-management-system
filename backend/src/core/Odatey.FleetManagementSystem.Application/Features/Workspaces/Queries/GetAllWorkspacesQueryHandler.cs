namespace Odatey.FleetManagementSystem.Application.Features.Workspaces.Queries;

public record GetAllWorkspacesQuery : IQuery<IEnumerable<WorkspaceResponse>>;

internal sealed class GetAllWorkspacesQueryHandler(IApplicationDbContext context) 
    : IQueryHandler<GetAllWorkspacesQuery, IEnumerable<WorkspaceResponse>>
{
    public async Task<IEnumerable<WorkspaceResponse>> Handle(GetAllWorkspacesQuery query, CancellationToken cancellationToken)
    {
        var workspaces = await context
            .Workspaces
            .Select(w => new WorkspaceResponse(
                w.Id.Value,
                w.WorkspaceTitle,
                w.CreatedAt,
                w.UpdatedAt,
                w.CreatedBy,
                w.UpdatedBy))
            .ToListAsync(cancellationToken);
        
        return workspaces;
    }
}

public record WorkspaceResponse(
    Guid Id,
    string WorkspaceTitle,
    DateTime? CreatedAt,
    DateTime? UpdatedAt,
    string? CreatedBy,
    string? UpdatedBy);