namespace Odatey.FleetManagementSystem.Domain.Fleets.ValueObjects;

public record FuelConsumedId
{
    public Guid Value { get; } = Guid.Empty;
    private FuelConsumedId(Guid value) => Value = value;

    public static FuelConsumedId Of(Guid value)
    {
        ArgumentNullException.ThrowIfNull(value);

        if (value == Guid.Empty)
        {
            throw new DomainExceptions("Fuel consumed id cannot be empty.");
        }
        
        return new FuelConsumedId(value);
    }
}