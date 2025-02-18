var builder = DistributedApplication.CreateBuilder(args);
builder.AddProject<Projects.Odatey_FleetManagementSystem_Api>("fleetManagementSystem");
builder.Build().Run();