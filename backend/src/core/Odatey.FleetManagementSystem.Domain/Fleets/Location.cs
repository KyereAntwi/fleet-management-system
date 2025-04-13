namespace Odatey.FleetManagementSystem.Domain.Fleets;

public class Location : BaseEntity<LocationId>
{
    protected Location() { }

    internal Location(VehicleId vehicleId, decimal longitude, decimal latitude, DateTime? createdAt)
    {
        Id = LocationId.Of(Guid.NewGuid());
        VehicleId = vehicleId;
        Longitude = longitude;
        Latitude = latitude;
        CreatedAt = createdAt ?? DateTime.UtcNow;
    }
    
    public VehicleId VehicleId { get; protected set; }
    public decimal Longitude { get; protected set; }
    public decimal Latitude { get; protected set; }
}