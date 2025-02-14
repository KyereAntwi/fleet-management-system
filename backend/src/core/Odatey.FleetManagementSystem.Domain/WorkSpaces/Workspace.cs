namespace Odatey.FleetManagementSystem.Domain.WorkSpaces;

public class Workspace : BaseEntity<WorkspaceId>
{
    public string WorkspaceTitle { get; set; } = string.Empty;

    public static Workspace Create(WorkspaceId id, string workspaceTitle)
    {
        var workspace = new Workspace
        {
            Id = id,
            WorkspaceTitle = workspaceTitle
        };
        
        return workspace;
    }

    public void Update(string workspaceTitle)
    {
        WorkspaceTitle = workspaceTitle;
    }
}