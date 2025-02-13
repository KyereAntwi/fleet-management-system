namespace Odatey.FleetManagementSystem.Application.Utilities;

public static class ExtensionMethods
{
    public static VehicleDetailsQueryDto ToVehicleDetailsQueryDto(this Vehicle exitingVehicle)
    {
        var fuelConsumptions = exitingVehicle.FuelConsumptions.Select(f => new FuelConsumedDto(f.FuelConsumedValue, f.CreatedAt));
        var maintenanceCosts = exitingVehicle.MaintenanceCosts.Select(m => new MaintenanceCostDto(m.Cost, m.CreatedAt));
        var accidentRepairCosts  = exitingVehicle.AccidentRepairCosts.Select(a => new AccidentRepairCostDto(a.Cost, a.CreatedAt));

        var response = new VehicleDetailsQueryDto(
            new VehicleDetailsDto(
                exitingVehicle.VehicleId.Value,
                exitingVehicle.WorkspaceId.Value,
                exitingVehicle.BrandAndType ?? string.Empty,
                exitingVehicle.InitialCost,
                exitingVehicle.MileageCovered ?? string.Empty,
                exitingVehicle.RoadworthyRenewalDate,
                exitingVehicle.InsuranceRenewalDate,
                exitingVehicle.CreatedAt,
                exitingVehicle.UpdatedAt,
                exitingVehicle.CreatedBy,
                exitingVehicle.UpdatedBy
            ),
            fuelConsumptions,
            maintenanceCosts,
            accidentRepairCosts
        );
        
        return response;
    }
}

public record VehicleDetailsQueryDto(
    VehicleDetailsDto Vehicle, 
    IEnumerable<FuelConsumedDto> FuelConsumed,
    IEnumerable<MaintenanceCostDto> MaintenanceCosts,
    IEnumerable<AccidentRepairCostDto> AccidentRepairCosts);

public record VehicleDetailsDto(
    Guid VehicleId,
    Guid WorkspaceId,
    string BrandAndType,
    double InitialCost,
    string MileageCovered,
    DateTime? RoadworthyRenewalDate,
    DateTime? InsuranceRenewalDate,
    DateTime? CreatedAt,
    DateTime? UpdatedAt,
    string? CreatedBy,
    string? UpdatedBy);
    
public record FuelConsumedDto(double FuelConsumedValue, DateTime? CreatedAt);
public record MaintenanceCostDto (double Cost, DateTime? CreatedAt);
public record AccidentRepairCostDto (double Cost, DateTime? CreatedAt);