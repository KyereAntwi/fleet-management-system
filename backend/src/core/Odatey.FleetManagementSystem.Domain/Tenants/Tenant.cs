using Odatey.FleetManagementSystem.Domain.Tenants.Enums;

namespace Odatey.FleetManagementSystem.Domain.Tenants;

public class Tenant : BaseEntity<TenantId>
{
    public required string UserId { get; set; }
    public required string ConnectionString { get; set; }
    public required Subscription Subscription { get; set; }

    public static Tenant Create(string userId, string connectionString, Subscription subscription)
    {
        var tenant = new Tenant
        {
            UserId = userId,
            ConnectionString = connectionString,
            Subscription = subscription
        };
        
        return tenant;
    }

    public void UpdateSubscription(Subscription subscription)
    {
        Subscription = subscription;
    }
}