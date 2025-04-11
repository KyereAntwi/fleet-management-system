namespace Odatey.FleetManagementSystem.Repositories.Data;

public class ApplicationTemplateDbContext : DbContext
{
    public ApplicationTemplateDbContext(DbContextOptions<ApplicationTemplateDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationTemplateDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
    
    public DbSet<Workspace> Workspaces => Set<Workspace>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<AccidentRepairCost> AccidentRepairCosts => Set<AccidentRepairCost>();
    public DbSet<FuelConsumed> FuelConsumptions => Set<FuelConsumed>();
    public DbSet<MaintenanceCost> MaintenanceCosts => Set<MaintenanceCost>();
    public DbSet<HirePayment> HirePayments => Set<HirePayment>();
}