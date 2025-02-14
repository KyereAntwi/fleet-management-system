namespace Odatey.FleetManagementSystem.Domain.Tenants.ValueObjects;

public record TenantId
{
    public Guid Value { get; } = Guid.Empty;
    
    private TenantId(Guid value) => Value = value;

    public static TenantId of(Guid value)
    {
        ArgumentNullException.ThrowIfNull(value);
        if (value == Guid.Empty)
        {
            throw new DomainExceptions("Invalid value for TenantId");
        }
        
        return new TenantId(value);
    }
}