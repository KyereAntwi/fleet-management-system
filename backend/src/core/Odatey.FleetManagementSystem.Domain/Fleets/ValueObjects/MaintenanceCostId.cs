namespace Odatey.FleetManagementSystem.Domain.Fleets.ValueObjects;

public record MaintenanceCostId
{
    public Guid Value { get; } = Guid.NewGuid();
    private MaintenanceCostId(Guid value) => Value = value;

    public static MaintenanceCostId Of(Guid value)
    {
        ArgumentNullException.ThrowIfNull(value);

        if (value == Guid.Empty)
        {
            throw new DomainExceptions("Maintenance cost id cannot be empty.");
        }

        return new MaintenanceCostId(value);
    }
}