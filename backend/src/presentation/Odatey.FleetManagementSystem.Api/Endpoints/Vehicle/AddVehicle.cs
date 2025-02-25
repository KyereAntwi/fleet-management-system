namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class AddVehicle(ISender sender) 
    : Endpoint<AddVehicleRequest, BaseResponse<AddVehicleToWorkspaceCommandResponse>>
{
    public override void Configure()
    {
        Post("/api/v1/workspaces/{WorkspaceId}/vehicles");
    }

    public override async Task HandleAsync(AddVehicleRequest req, CancellationToken ct)
    {
        var result = await sender.Send(new AddVehicleToWorkspaceCommand(
            req.WorkspaceId,
            req.BrandAndType,
            req.InitialCost,
            req.MileageCovered,
            req.RoadWorthyRenewalDate,
            req.InsuranceRenewalDate), ct);

        await SendCreatedAtAsync<GetVehicle>(new 
        {
            VehicleId = result.Id
        }, new BaseResponse<AddVehicleToWorkspaceCommandResponse>
        {
            StatusCode = (int)HttpStatusCode.Created,
            Data = result,
            Success = true,
            Message = "Vehicle added successfully"
        }, cancellation: ct);
    }
}

public class AddVehicleRequestValidator : Validator<AddVehicleRequest>
{
    public AddVehicleRequestValidator()
    {
        RuleFor(v => v.WorkspaceId)
            .NotEmpty().WithMessage("WorkspaceId cannot be empty")
            .NotNull();

        RuleFor(v => v.BrandAndType)
            .NotEmpty().WithMessage("BrandAndType cannot be empty")
            .NotNull();

        RuleFor(v => v.InitialCost)
            .GreaterThan(0).WithMessage("Initial cost should be more than 0.0");

        RuleFor(v => v.RoadWorthyRenewalDate)
            .GreaterThan(DateTime.Now).WithMessage("RoadWorthyRenewalDate should be greater than today")
            .NotNull();

        RuleFor(v => v.InsuranceRenewalDate)
            .GreaterThan(DateTime.Now).WithMessage("InsuranceRenewalDate should be greater than today")
            .NotNull();
    }
}
