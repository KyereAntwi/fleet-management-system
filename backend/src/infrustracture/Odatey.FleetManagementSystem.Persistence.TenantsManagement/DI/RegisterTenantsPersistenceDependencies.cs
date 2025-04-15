using Microsoft.Extensions.Configuration;

namespace Odatey.FleetManagementSystem.Persistence.TenantsManagement.DI;

public static class RegisterTenantsPersistenceDependencies
{
    public static IServiceCollection AddTenantsPersistenceDependencies(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<TenantsDbContext>(opt =>
        {
            opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
        });
        
        services.AddScoped<ITenantRepository, TenantRepository>();
        return services;
    }
}