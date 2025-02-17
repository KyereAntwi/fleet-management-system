namespace Odatey.FleetManagementSystem.Persistence.TenantsManagement.Repositories;

public class TenantRepository(TenantsDbContext tenantsDbContext) : ITenantRepository
{
    public async Task<Tenant> CreateAsync(Tenant tenant)
    {
        await tenantsDbContext.AddAsync(tenant);
        await tenantsDbContext.SaveChangesAsync();
        return tenant;
    }

    public async Task<string?> GetConnectionStringAsync(string userId)
    {
        var tenant = await tenantsDbContext.Tenants.FirstOrDefaultAsync(t => t.UserId == userId);
        return tenant?.ConnectionString;
    }

    public async Task<Tenant?> GetTenantAsync(string userId)
    {
        return await tenantsDbContext.Tenants.FirstOrDefaultAsync(t => t.UserId == userId);
    }
}