namespace Odatey.FleetManagementSystem.Domain.Fleets.ValueObjects;

public record LocationId
{
    public Guid Value { get; } = Guid.Empty;
    
    private LocationId(Guid value) => Value = value;

    public static LocationId Of(Guid value)
    {
        ArgumentNullException.ThrowIfNull(value);

        if (value == Guid.Empty)
        {
            throw new ArgumentException("Location id cannot be empty");
        }

        return new LocationId(value);
    }
}