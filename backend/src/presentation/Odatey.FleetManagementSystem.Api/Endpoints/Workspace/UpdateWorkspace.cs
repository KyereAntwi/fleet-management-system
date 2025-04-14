namespace Odatey.FleetManagementSystem.Api.Endpoints.Workspace;

public class UpdateWorkspace(ISender sender) : Endpoint<UpdateWorkspaceRequest>
{
    public override void Configure()
    {
        Put("/api/v1/workspaces/{WorkspaceId}");
    }

    public override async Task HandleAsync(UpdateWorkspaceRequest req, CancellationToken ct)
    {
        var response = await sender.Send(new UpdateWorkspaceCommand(req.WorkspaceId, req.Title), ct);

        await SendNoContentAsync(ct);
    }
}

public class UpdateWorkspaceValidator : Validator<UpdateWorkspaceRequest>
{
    public UpdateWorkspaceValidator()
    {
        RuleFor(w => w.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters.")
            .NotNull();
    }
}