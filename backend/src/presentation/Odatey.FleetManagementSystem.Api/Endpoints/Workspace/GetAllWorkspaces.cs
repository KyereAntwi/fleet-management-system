namespace Odatey.FleetManagementSystem.Api.Endpoints.Workspace;

public class GetAllWorkspaces : EndpointWithoutRequest<BaseResponse<IEnumerable<WorkspaceResponse>>>
{
    private readonly ISender _sender;

    public GetAllWorkspaces(ISender sender) => _sender = sender;
    
    public override void Configure()
    {
        Get("/api/v1/workspaces");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var response = await _sender.Send(new GetAllWorkspacesQuery(), ct);
        await SendAsync(new BaseResponse<IEnumerable<WorkspaceResponse>>
        {
            Success = true,
            Data = response,
            Message = "Success",
            StatusCode = 200
        }, cancellation: ct);
    }
}