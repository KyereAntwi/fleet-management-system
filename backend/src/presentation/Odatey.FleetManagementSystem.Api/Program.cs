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

app.Run();