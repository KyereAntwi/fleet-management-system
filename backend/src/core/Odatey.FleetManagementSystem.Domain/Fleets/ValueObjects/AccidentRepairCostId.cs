namespace Odatey.FleetManagementSystem.Domain.Fleets.ValueObjects;

public record AccidentRepairCostId
{
    public Guid Value { get; } = Guid.Empty;
    private AccidentRepairCostId(Guid value) => Value = value;

    public static AccidentRepairCostId Of(Guid value)
    {
        ArgumentNullException.ThrowIfNull(value);
        
        if (value == Guid.Empty)
        {
            throw new DomainExceptions("Accident repair cost id cannot be empty.");
        }
        
        return new AccidentRepairCostId(value);
    }
}