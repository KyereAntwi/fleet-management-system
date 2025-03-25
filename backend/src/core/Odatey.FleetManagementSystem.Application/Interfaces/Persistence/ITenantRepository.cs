namespace Odatey.FleetManagementSystem.Application.Interfaces.Persistence;

public interface ITenantRepository
{
    Task<Tenant> CreateAsync(Tenant tenant);
    Task GenerateTenantDatabase(string database);
    Task ApplyMigrationAsync(string connectionString);
    Task<string?> GetConnectionStringAsync(string userId);
    Task<Tenant?> GetTenantAsync(string tenantId);
    Task<Tenant?> GetTenantByUserIdAsync(string userId);
    Task DeleteTenantAsync(Guid tenantId);
    Task SaveChangesAsync();
    Task<IReadOnlyList<Tenant>> GetAllTenantIdsAsync();
}