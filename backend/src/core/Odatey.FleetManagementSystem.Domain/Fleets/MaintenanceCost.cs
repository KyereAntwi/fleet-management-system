namespace Odatey.FleetManagementSystem.Domain.Fleets;

public class MaintenanceCost : BaseEntity<MaintenanceCostId>
{
    protected MaintenanceCost() { }

    internal MaintenanceCost(VehicleId vehicleId, double cost)
    {
        Id = MaintenanceCostId.Of(Guid.NewGuid());
        VehicleId = vehicleId;
        Cost = cost;
    }

    public VehicleId VehicleId { get; protected set; }
    public double Cost { get; protected set; }
}