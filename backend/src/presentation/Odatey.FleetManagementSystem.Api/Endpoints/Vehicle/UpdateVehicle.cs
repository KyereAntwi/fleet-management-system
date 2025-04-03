namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class UpdateVehicle(ISender sender) : Endpoint<UpdateVehicleRequest>
{
    public override void Configure()
    {
        Put("api/workspaces/{WorkspaceId}/vehicles/{Id}");
    }

    public override async Task HandleAsync(UpdateVehicleRequest req, CancellationToken ct)
    {
        await sender.Send(new UpdateVehicleCommand(
            req.Id,
            req.BrandAndType,
            req.InitialCost,
            req.MileageCovered,
            req.RoadworthyRenewalDate,
            req.InsuranceRenewalDate), ct);

        await SendNoContentAsync(cancellation: ct);
    }
}

public class UpdateVehicleValidator : Validator<UpdateVehicleRequest>
{
    public UpdateVehicleValidator()
    {
        RuleFor(v => v.BrandAndType)
            .NotEmpty().WithMessage("BrandAndType cannot be empty")
            .NotNull();

        RuleFor(v => v.InitialCost)
            .GreaterThan(0).WithMessage("Initial cost should be more than 0.0");

        RuleFor(v => v.RoadworthyRenewalDate)
            .GreaterThan(DateTime.Now).WithMessage("RoadWorthyRenewalDate should be greater than today")
            .NotNull();

        RuleFor(v => v.InsuranceRenewalDate)
            .GreaterThan(DateTime.Now).WithMessage("InsuranceRenewalDate should be greater than today")
            .NotNull();
    }
}

public record UpdateVehicleRequest(
    [FromRoute] Guid WorkspaceId,
    [FromRoute] Guid Id,
    string BrandAndType,
    double InitialCost,
    string MileageCovered,
    DateTime RoadworthyRenewalDate,
    DateTime InsuranceRenewalDate);