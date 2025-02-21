namespace Odatey.FleetManagementSystem.Api.Endpoints.Workspace;

[Authorize]
public class GetSingleWorkspace(ISender sender) : Endpoint<GetByIdRequest, BaseResponse<WorkspaceResponse>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{workspaceId}");
    }

    public override async Task HandleAsync(GetByIdRequest req, CancellationToken ct)
    {
        var workspace = await sender.Send(new GetSingleWorkspacesQuery(req.WorkspaceId), cancellationToken: ct);
        
        await SendAsync(new BaseResponse<WorkspaceResponse>
        {
            Data = workspace,
            Success = true,
            Message = "Successfully retrieved workspace.",
            StatusCode = 200
        }, cancellation: ct);
    }
}

public class GetSingleWorkspaceValidator : Validator<GetByIdRequest>
{
    public GetSingleWorkspaceValidator()
    {
        RuleFor(w => w.WorkspaceId)
            .NotEmpty().WithMessage("Workspace Id cannot be empty.")
            .NotNull();
    }
}