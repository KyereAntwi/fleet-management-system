using Odatey.FleetManagementSystem.Application.Interfaces.Services;

namespace Odatey.FleetManagementSystem.Api.Endpoints.Workspace;

public class CreateWorkspace(ISender sender, IAuthenticatedUser authenticatedUser)
    : Endpoint<CreateWorkspaceRequest, BaseResponse<CreateWorkspaceResponse>>
{
    public override void Configure()
    {
        Post("/api/v1/workspaces");
    }

    public override async Task HandleAsync(CreateWorkspaceRequest req, CancellationToken ct)
    {
        var result = await sender.Send(new CreateWorkspaceCommand(req.Title), ct);
        
        await SendCreatedAtAsync<GetSingleWorkspace>(new
        {
            workspaceId = result.Id
        }, new BaseResponse<CreateWorkspaceResponse>
        {
            Success = true,
            Message = "Workspace Created",
            StatusCode = 201,
            Data = result
        }, cancellation: ct);
    }
}

public class CreateWorkspaceValidator : Validator<CreateWorkspaceRequest>
{
    public CreateWorkspaceValidator()
    {
        RuleFor(w => w.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters.")
            .NotNull();
    }
}