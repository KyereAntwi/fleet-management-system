namespace Odatey.FleetManagementSystem.Domain.Fleets;

public class FuelConsumed : BaseEntity<FuelConsumedId>
{
    protected FuelConsumed() { }
    
    internal FuelConsumed(VehicleId vehicleId, double fuelConsumed, DateTime? createdAt)
    {
        Id = FuelConsumedId.Of(Guid.NewGuid());
        VehicleId = vehicleId;
        FuelConsumedValue = fuelConsumed;
    }
    
    public VehicleId VehicleId { get; protected set; }
    public double FuelConsumedValue { get; protected set; }
}