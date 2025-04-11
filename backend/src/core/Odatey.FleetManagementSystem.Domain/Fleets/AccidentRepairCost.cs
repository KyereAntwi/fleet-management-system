namespace Odatey.FleetManagementSystem.Domain.Fleets;

public class AccidentRepairCost : BaseEntity<AccidentRepairCostId>
{
    protected AccidentRepairCost() {}

    internal AccidentRepairCost(VehicleId vehicleId, double cost, DateTime? createdAt)
    {
        Id = AccidentRepairCostId.Of(Guid.NewGuid());
        VehicleId = vehicleId;
        Cost = cost;
    }
    
    public VehicleId VehicleId { get; protected set; }
    public double Cost { get; protected set; }
}