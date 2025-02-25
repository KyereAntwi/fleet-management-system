﻿
namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class UpdateVehicleExpenditure(ISender sender) : Endpoint<UpdateVehicleExpenditureRequest>
{
    public override void Configure()
    {
        Put("/api/V1/workspaces/{WorkspaceId}/vehicles/{VehicleId}/expenditure");
    }

    public override async Task HandleAsync(UpdateVehicleExpenditureRequest req, CancellationToken ct)
    {
        VehicleExpenditureType expenditureType = (VehicleExpenditureType)Enum.Parse(typeof(VehicleExpenditureType), req.ExpenditureType);

        switch(expenditureType)
        {
            case VehicleExpenditureType.FuelConsumption:
                await sender.Send(new AddFuelConsumptionToVehicleCommand(req.VehicleId, req.Cost), ct);
                break;
            case VehicleExpenditureType.Maintenance:
                await sender.Send(new AddMaintenanceCostToVehicleCommand(req.VehicleId, req.Cost), ct);
                break;
            case VehicleExpenditureType.AccidentRepair:
                await sender.Send(new AddAccidentRepairCostToVehicleCommand(req.VehicleId, req.Cost), ct);
                break;
            default:
                throw new BadRequestException("Invalid ExpenditureType");
        }

        await SendNoContentAsync(cancellation: ct);
    }
}

public class UpdateVehicleExpenditureValidator : Validator<UpdateVehicleExpenditureRequest>
{
    public UpdateVehicleExpenditureValidator()
    {
        RuleFor(w => w.Cost)
            .GreaterThan(0).WithMessage("Cost should be greaterthan 0.0")
            .NotNull();

        RuleFor(w => w.ExpenditureType)
            .NotEmpty().WithMessage("ExpenditureType is required.")
            .NotNull();
    }
}
