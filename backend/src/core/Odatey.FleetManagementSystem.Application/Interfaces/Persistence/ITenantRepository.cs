namespace Odatey.FleetManagementSystem.Application.Interfaces.Persistence;

public interface ITenantRepository
{
    Task<Tenant> CreateAsync(Tenant tenant);
    Task<string> GetConnectionStringAsync(string userId);
    Task<Tenant?> GetTenantAsync(string userId);
}