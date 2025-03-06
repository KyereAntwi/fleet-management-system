namespace Odatey.FleetManagementSystem.Api.Endpoints.Workspace;

public class GetAllWorkspaces(ISender sender) : EndpointWithoutRequest<BaseResponse<IEnumerable<WorkspaceResponse>>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var response = await sender.Send(new GetAllWorkspacesQuery(), ct);
        await SendAsync(new BaseResponse<IEnumerable<WorkspaceResponse>>
        {
            Success = true,
            Data = response,
            Message = "Success",
            StatusCode = 200
        }, cancellation: ct);
    }
}