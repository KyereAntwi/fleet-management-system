namespace Odatey.FleetManagementSystem.ExternalServices.DI;

public static class RegisterExternalServicesDependencies
{
    public static IServiceCollection RegisterExternalServices(this IServiceCollection services)
    {
        services.AddSingleton<ICsvService, CsvService>();
        services.AddSingleton<IAuthenticatedUser, AuthenticatedUser>();
        
        return services;
    }
}