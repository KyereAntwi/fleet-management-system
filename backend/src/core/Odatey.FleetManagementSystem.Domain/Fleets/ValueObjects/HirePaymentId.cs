namespace Odatey.FleetManagementSystem.Domain.Fleets.ValueObjects;

public record HirePaymentId
{
    public Guid Value { get; } = Guid.Empty;
    
    private HirePaymentId(Guid value) => Value = value;
    
    public static HirePaymentId Of(Guid value)
    {
        ArgumentNullException.ThrowIfNull(value);

        if (value == Guid.Empty)
        {
            throw new DomainExceptions("Hire payment id cannot be empty.");
        }
        
        return new HirePaymentId(value);
    }
}