
namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class AddBulkVehiclesFromFile(ISender sender) : Endpoint<AddBulkVehiclesRequest>
{
    public override void Configure()
    {
        Post("/api/V1/workspaces/{WorkspaceId}/vehicles/bulk");
        AllowFileUploads();
    }

    public override async Task HandleAsync(AddBulkVehiclesRequest req, CancellationToken ct)
    {
        await sender.Send(new AddBulkVehiclesFromFileToWorkspaceCommand(req.WorkspaceId, req.File), ct);

        await SendNoContentAsync(cancellation: ct);
    }
}

public class AddBulkVehiclesFromFileValidator : Validator<AddBulkVehiclesRequest>
{
    public AddBulkVehiclesFromFileValidator()
    {
        RuleFor(w => w.File)
            .NotEmpty().WithMessage("No file uploaded")
            .NotNull();
    }
}
