namespace Odatey.FleetManagementSystem.Repositories.DI;

public static class RegisterPersistenceDependencies
{
    public static IServiceCollection AddPersistenceDependencies(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>();

        services.AddDbContext<ApplicationTemplateDbContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
        });
        
        services.AddScoped(typeof(IAsyncRepository<>), typeof(AsyncRepository<>));
        services.AddScoped<IVehicleRepository, VehicleRepository>();
        services.AddScoped<IWorkspaceRepository, WorkspaceRepository>();
        services.AddScoped<IReportsRepository, ReportsRepository>();
        
        return services;
    }
}