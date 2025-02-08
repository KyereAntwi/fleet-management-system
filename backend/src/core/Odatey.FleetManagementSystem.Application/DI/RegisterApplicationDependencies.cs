namespace Odatey.FleetManagementSystem.Application.DI;

public static class RegisterApplicationDependencies
{
    public static IServiceCollection RegisterApplication(this IServiceCollection services)
    {
        services.AddMediatR(options =>
        {
            options.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
        });

        return services;
    }
}