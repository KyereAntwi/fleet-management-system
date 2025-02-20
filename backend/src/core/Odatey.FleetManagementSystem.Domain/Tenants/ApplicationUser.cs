namespace Odatey.FleetManagementSystem.Domain.Tenants;

public class ApplicationUser : BaseEntity<ApplicationUserId>
{
    private ApplicationUser() { }

    internal ApplicationUser(TenantId tenantId, string userId)
    {
        Id = ApplicationUserId.of(Guid.NewGuid());
        TenantId = tenantId;
        UserId = userId;
    }
    
    public TenantId TenantId { get; protected set; }
    public string UserId { get; protected set; }
}