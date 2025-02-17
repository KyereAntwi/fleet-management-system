using Odatey.FleetManagementSystem.Application.DI;
using Odatey.FleetManagementSystem.Persistence.TenantsManagement.DI;
using Odatey.FleetManagementSystem.Repositories.DI;

namespace Odatey.FleetManagementSystem.Api.DI;

public static class Setup
{
    public static WebApplication AddServices(this WebApplicationBuilder builder)
    {
        builder.Services.RegisterApplication();
        builder.Services.AddPersistenceDependencies(builder.Configuration);
        builder.Services.AddTenantsPersistenceDependencies();
        
        builder.Services.AddHttpContextAccessor();
        
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("Open", b =>
                b.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
        });
        
        builder.Services.AddFastEndpoints();
        return builder.Build();
    }

    public static WebApplication AddPipeline(this WebApplication app)
    {
        app.UseCors("Open");
        app.UseFastEndpoints();
        return app;
    }
}