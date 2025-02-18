namespace Odatey.FleetManagementSystem.Persistence.TenantsManagement.Repositories;

public class TenantRepository(TenantsDbContext tenantsDbContext, IServiceScopeFactory serviceScopeFactory)  : ITenantRepository
{
    public async Task<Tenant> CreateAsync(Tenant tenant)
    {
        await tenantsDbContext.AddAsync(tenant);
        await tenantsDbContext.SaveChangesAsync();

        //await ApplyMigrations(tenant.ConnectionString);
        
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
    
    // private async Task ApplyMigrations(string connectionString)
    // {
    //     using var scope = serviceScopeFactory.CreateScope();
    //     var applicationDbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    //     applicationDbContext.Database.SetConnectionString(connectionString);
    //     await applicationDbContext.Database.MigrateAsync();
    // }
}