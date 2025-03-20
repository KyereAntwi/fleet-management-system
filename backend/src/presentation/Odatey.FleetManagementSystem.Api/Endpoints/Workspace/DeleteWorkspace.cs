namespace Odatey.FleetManagementSystem.Api.Endpoints.Workspace;

public class DeleteWorkspace(ISender sender) : Endpoint<DeleteWorkspaceRequest>
{
    public override void Configure()
    {
        Delete("/workspace/{workspaceId}");
    }

    public override async Task HandleAsync(DeleteWorkspaceRequest req, CancellationToken ct)
    {
        await sender.Send(new DeleteWorkspaceCommand(req.WorkspaceId), ct);
        await SendNoContentAsync(ct);
    }
}

public record DeleteWorkspaceRequest([FromRoute] Guid WorkspaceId);