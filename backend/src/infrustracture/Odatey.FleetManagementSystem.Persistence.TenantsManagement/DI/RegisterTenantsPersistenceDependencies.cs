namespace Odatey.FleetManagementSystem.Persistence.TenantsManagement.DI;

public static class RegisterTenantsPersistenceDependencies
{
    public static IServiceCollection AddTenantsPersistenceDependencies(this IServiceCollection services)
    {
        services.AddDbContext<TenantsDbContext>(opt =>
        {
            opt.UseSqlite("Data Source=TenantsManagement.db");
        });
        
        services.AddScoped<ITenantRepository, TenantRepository>();
        return services;
    }
}