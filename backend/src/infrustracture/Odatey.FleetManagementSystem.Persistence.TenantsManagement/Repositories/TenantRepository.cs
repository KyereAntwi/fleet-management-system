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
        var query = $"IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '{database}') CREATE DATABASE [{database}]";
        var masterConnectionString = databaseSettings.MasterConnectionString;

        await using var masterConnection = new SqlConnection(masterConnectionString);
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
            .AsSplitQuery()
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.ApplicationUsers.Select(a => a.UserId).Contains(userId));
        
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

    public async Task SaveChangesAsync()
    {
        await tenantsDbContext.SaveChangesAsync();
    }

    public async Task ApplyMigrationAsync(string connectionString)
    {
        using var scope = serviceScopeFactory.CreateScope();
        var applicationDbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        applicationDbContext.Database.SetConnectionString(connectionString);
        await applicationDbContext.Database.MigrateAsync();
    }
}