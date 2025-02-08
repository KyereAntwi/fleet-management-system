namespace Odatey.FleetManagementSystem.Domain.Fleets.ValueObjects;

public record VehicleId
{
    public Guid Value { get; } = Guid.Empty;
    private VehicleId(Guid value) => Value = value;

    public static VehicleId Of(Guid value)
    {
        ArgumentNullException.ThrowIfNull(value);
        if (value == Guid.Empty)
        {
            throw new DomainExceptions("Vehicle Id cannot be null or empty");
        }

        return new VehicleId(value);
    }
}