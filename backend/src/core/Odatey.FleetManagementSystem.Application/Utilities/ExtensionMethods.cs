namespace Odatey.FleetManagementSystem.Application.Utilities;

public static class ExtensionMethods
{
    public static VehicleDetailsQueryDto ToVehicleDetailsQueryDto(this Vehicle exitingVehicle)
    {
        var fuelConsumptions = exitingVehicle.FuelConsumptions.Select(f => new FuelConsumedDto(f.Id.Value, f.FuelConsumedValue, f.CreatedAt));
        var maintenanceCosts = exitingVehicle.MaintenanceCosts.Select(m => new MaintenanceCostDto(m.Id.Value, m.Cost, m.CreatedAt));
        var accidentRepairCosts  = exitingVehicle.AccidentRepairCosts.Select(a => new AccidentRepairCostDto(a.Id.Value, a.Cost, a.CreatedAt));
        var hirePayments = exitingVehicle.HirePayments.Select(h => new HirePaymentDto(h.Id.Value, h.Payment, h.CreatedAt));

        var response = new VehicleDetailsQueryDto(
            new VehicleDetailsDto(
                exitingVehicle.Id.Value,
                exitingVehicle.WorkspaceId.Value,
                exitingVehicle.BrandAndType ?? string.Empty,
                exitingVehicle.InitialCost,
                exitingVehicle.MileageCovered ?? string.Empty,
                exitingVehicle.RoadworthyRenewalDate,
                exitingVehicle.InsuranceRenewalDate,
                exitingVehicle.AnnualDepreciation,
                exitingVehicle.CreatedAt,
                exitingVehicle.UpdatedAt,
                exitingVehicle.CreatedBy,
                exitingVehicle.UpdatedBy
            ),
            fuelConsumptions,
            maintenanceCosts,
            accidentRepairCosts,
            hirePayments
        );
        
        return response;
    }
}

public record VehicleDetailsQueryDto(
    VehicleDetailsDto Vehicle, 
    IEnumerable<FuelConsumedDto> FuelConsumed,
    IEnumerable<MaintenanceCostDto> MaintenanceCosts,
    IEnumerable<AccidentRepairCostDto> AccidentRepairCosts,
    IEnumerable<HirePaymentDto> HirePayments);

public record VehicleDetailsDto(
    Guid VehicleId,
    Guid WorkspaceId,
    string BrandAndType,
    double InitialCost,
    string MileageCovered,
    DateTime? RoadworthyRenewalDate,
    DateTime? InsuranceRenewalDate,
    decimal? AnnualDepreciation,
    DateTime? CreatedAt,
    DateTime? UpdatedAt,
    string? CreatedBy,
    string? UpdatedBy);
    
public record FuelConsumedDto(Guid Id, double FuelConsumedValue, DateTime? CreatedAt);
public record MaintenanceCostDto (Guid Id, double Cost, DateTime? CreatedAt);
public record AccidentRepairCostDto (Guid Id, double Cost, DateTime? CreatedAt);
public record HirePaymentDto (Guid Id, double Payment, DateTime? CreatedAt);