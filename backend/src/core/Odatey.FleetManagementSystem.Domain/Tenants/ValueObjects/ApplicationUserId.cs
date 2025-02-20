namespace Odatey.FleetManagementSystem.Domain.Tenants.ValueObjects;

public record ApplicationUserId
{
    public Guid Value { get; } = Guid.Empty;
    
    private ApplicationUserId(Guid value) => Value = value;

    public static ApplicationUserId of(Guid value)
    {
        ArgumentNullException.ThrowIfNull(value);
        if (value == Guid.Empty)
        {
            throw new DomainExceptions("ApplicationUserId cannot be empty.");
        }
        
        return new ApplicationUserId(value);
    }
}