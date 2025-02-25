namespace Odatey.FleetManagementSystem.Contracts.Requests.Vehicles;

public record UpdateVehicleExpenditureRequest(
    Guid VehicleId,
    string ExpenditureType,
    double Cost);

public enum VehicleExpenditureType
{
    FuelConsumption,
    Maintenance,
    AccidentRepair
}
