namespace Odatey.FleetManagementSystem.Domain.Tenants;

public class Tenant : BaseEntity<TenantId>
{
    private readonly Collection<ApplicationUser> _applicationUsers = [];
    public IReadOnlyCollection<ApplicationUser> ApplicationUsers => _applicationUsers.AsReadOnly();
    
    public required string ConnectionString { get; set; }
    public required Subscription Subscription { get; set; }

    public static Tenant Create(string userId, string connectionString, Subscription subscription)
    {
        var tenant = new Tenant
        {
            Id = TenantId.of(Guid.NewGuid()),
            ConnectionString = connectionString,
            Subscription = subscription,
            CreatedBy = userId
        };
        
        tenant._applicationUsers.Add(new ApplicationUser(tenant.Id, userId));
        
        return tenant;
    }

    public void UpdateSubscription(Subscription subscription, string userId)
    {
        if (userId != CreatedBy)
        {
            throw new DomainExceptions("Only the creator can update the subscription.");
        }
        
        Subscription = subscription;
    }

    public void AddApplicationUser(string userId)
    {
        var newApplicationUser = new ApplicationUser(Id, userId);
        _applicationUsers.Add(newApplicationUser);
    }
}