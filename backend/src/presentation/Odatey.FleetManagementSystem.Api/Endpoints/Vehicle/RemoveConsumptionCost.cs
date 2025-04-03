namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class RemoveConsumptionCost(ISender sender) : Endpoint<RemoveConsumptionCostRequest>
{
    public override void Configure()
    {
        Delete("/api/V1/workspaces/{WorkspaceId}/vehicles/{VehicleId}/expenditure/{Id}");
    }

    public override async Task HandleAsync(RemoveConsumptionCostRequest req, CancellationToken ct)
    {
        var expenditureType = (VehicleExpenditureType)Enum.Parse(typeof(VehicleExpenditureType), req.ExpenditureType);
        
        await sender.Send(new RemoveConsumptionCostCommand(req.VehicleId, req.Id, expenditureType), ct);

        await SendNoContentAsync(ct);
    }
}

public class RemoveConsumptionCostValidator : Validator<RemoveConsumptionCostRequest>
{
    public RemoveConsumptionCostValidator()
    {
        RuleFor(w => w.ExpenditureType)
            .NotEmpty().WithMessage("ExpenditureType is required.")
            .NotNull();
    }
}

public record RemoveConsumptionCostRequest(
    [FromRoute] Guid VehicleId, 
    [FromRoute] Guid Id, 
    [Microsoft.AspNetCore.Mvc.FromQuery] string ExpenditureType);