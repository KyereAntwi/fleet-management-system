namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class UpdateVehicle(ISender sender) : Endpoint<UpdateVehicleRequest>
{
    public override void Configure()
    {
        Put("/api/v1/workspaces/{WorkspaceId}/vehicles/{VehicleId}");
    }

    public override async Task HandleAsync(UpdateVehicleRequest req, CancellationToken ct)
    {
        await sender.Send(new UpdateVehicleCommand(
            req.VehicleId,
            req.BrandAndType,
            req.InitialCost,
            req.MileageCovered,
            DateTime.SpecifyKind(req.RoadworthyRenewalDate, DateTimeKind.Utc), 
            DateTime.SpecifyKind(req.InsuranceRenewalDate, DateTimeKind.Utc)), ct);

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
    Guid WorkspaceId,
    Guid VehicleId,
    string BrandAndType,
    double InitialCost,
    string MileageCovered,
    DateTime RoadworthyRenewalDate,
    DateTime InsuranceRenewalDate);