namespace Odatey.FleetManagementSystem.Domain.WorkSpaces;

public class Workspace : BaseEntity<WorkspaceId>
{
    public string WorkspaceTitle { get; set; } = string.Empty;
    public string TenantId { get; set; } = string.Empty;

    public static Workspace Create(WorkspaceId id, string workspaceTitle, string tenantId)
    {
        var workspace = new Workspace
        {
            Id = id,
            WorkspaceTitle = workspaceTitle,
            TenantId = tenantId
        };
        
        return workspace;
    }

    public void Update(string workspaceTitle)
    {
        WorkspaceTitle = workspaceTitle;
    }
}