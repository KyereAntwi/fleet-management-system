Log.Logger = new LoggerConfiguration()
    .WriteTo.Console().CreateBootstrapLogger();

Log.Information("Odatey Fleet Management System API starting ... ");

var builder = WebApplication.CreateBuilder(args);

builder
    .Host
    .UseSerilog((context, loggerConfiguration) => loggerConfiguration
        .WriteTo.Console()
        .ReadFrom.Configuration(context.Configuration));

var app = builder.AddServices().AddPipeline();

ApplyMigrations(app);

app.Run();
return;

void ApplyMigrations(IHost host)
{
    using var scope = host.Services.CreateScope();
    var services = scope.ServiceProvider;
    var tenantRepository = services.GetRequiredService<ITenantRepository>();

    var tenants = tenantRepository.GetAllTenantIdsAsync().Result;
    foreach (var tenant in tenants)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationTemplateDbContext>();
        optionsBuilder.UseNpgsql(tenant.ConnectionString);

        //using var context = new ApplicationDbContext(optionsBuilder.Options, tenantRepository, null);
        using var context = new ApplicationTemplateDbContext(optionsBuilder.Options);
        context.Database.Migrate();
    }
}