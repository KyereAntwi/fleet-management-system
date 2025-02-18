using Odatey.FleetManagementSystem.Repositories.Data;
using Odatey.FleetManagementSystem.Repositories.Repositories;

namespace Odatey.FleetManagementSystem.Repositories.DI;

public static class RegisterPersistenceDependencies
{
    public static IServiceCollection AddPersistenceDependencies(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>();
        
        services.AddScoped(typeof(IAsyncRepository<>), typeof(AsyncRepository<>));
        services.AddScoped<IVehicleRepository, VehicleRepository>();
        
        return services;
    }
}