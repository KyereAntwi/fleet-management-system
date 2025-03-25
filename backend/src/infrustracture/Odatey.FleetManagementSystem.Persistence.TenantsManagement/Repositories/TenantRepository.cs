namespace Odatey.FleetManagementSystem.Persistence.TenantsManagement.Repositories;

public class TenantRepository(TenantsDbContext tenantsDbContext, IServiceScopeFactory serviceScopeFactory, TenantDatabaseSettings databaseSettings)  : ITenantRepository
{
    public async Task<Tenant> CreateAsync(Tenant tenant)
    {
        await tenantsDbContext.AddAsync(tenant);
        await tenantsDbContext.SaveChangesAsync();
        
        return tenant;
    }

    public async Task GenerateTenantDatabase(string database)
    {
        var query = $"CREATE DATABASE \"{database}\"";
        var masterConnectionString = databaseSettings.MasterConnectionString;

        await using var masterConnection = new NpgsqlConnection(masterConnectionString);
        await masterConnection.OpenAsync();
        var command = masterConnection.CreateCommand();
        command.CommandText = query;
        await command.ExecuteNonQueryAsync();
    }

    public async Task<string?> GetConnectionStringAsync(string userId)
    {
        var tenant = await tenantsDbContext
            .Tenants
            .Include(t => t.ApplicationUsers)
            .AsSingleQuery()
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.ApplicationUsers.Any(u => u.UserId == userId));
        
        return tenant?.ConnectionString;
    }

    public async Task<Tenant?> GetTenantAsync(string tenantId)
    {
        return await tenantsDbContext
            .Tenants
            .Include(t => t.ApplicationUsers)
            .AsSplitQuery()
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == TenantId.of(new Guid(tenantId)));
    }

    public async Task<Tenant?> GetTenantByUserIdAsync(string userId)
    {
        return await tenantsDbContext
            .Tenants
            .Include(t => t.ApplicationUsers)
            .AsSplitQuery()
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.ApplicationUsers.Select(a => a.UserId).Contains(userId));
    }

    public async Task DeleteTenantAsync(Guid tenantId)
    {
        var tenant = await tenantsDbContext.Tenants.FindAsync(tenantId);
        
        if (tenant != null)
        {
            tenantsDbContext.Tenants.Remove(tenant);
            await tenantsDbContext.SaveChangesAsync();
        }
    }

    public async Task SaveChangesAsync()
    {
        await tenantsDbContext.SaveChangesAsync();
    }

    public async Task<IReadOnlyList<Tenant>> GetAllTenantIdsAsync()
    {
        return await tenantsDbContext.Tenants.ToListAsync();
    }

    public async Task ApplyMigrationAsync(string connectionString)
    {
        using var scope = serviceScopeFactory.CreateScope();
        
        var context = new DbContextOptionsBuilder<ApplicationTemplateDbContext>().UseNpgsql(connectionString).Options;

        await using var dbContext = new ApplicationTemplateDbContext(context);
        await dbContext.Database.MigrateAsync();
    }
}