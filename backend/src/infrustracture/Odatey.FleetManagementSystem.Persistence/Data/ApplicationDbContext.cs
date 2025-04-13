namespace Odatey.FleetManagementSystem.Repositories.Data;

public class ApplicationDbContext : DbContext
{
    private readonly ITenantRepository _tenantRepository;
    private readonly IAuthenticatedUser _authenticatedUser;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        ITenantRepository tenantRepository,
        IAuthenticatedUser authenticatedUser) : base(options)
    {
        _tenantRepository = tenantRepository;
        _authenticatedUser = authenticatedUser;
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<IEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedBy = _authenticatedUser?.UserId;
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedBy = _authenticatedUser?.UserId;
                    break;
            }
        }
        
        return await base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var userId = _authenticatedUser?.UserId;

        if (string.IsNullOrEmpty(userId)) throw new BadRequestException("Missing User id from the request headers.");
        
        var connectionString = _tenantRepository.GetConnectionStringAsync(userId).Result;
        optionsBuilder.UseNpgsql(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
    
    public DbSet<Workspace> Workspaces => Set<Workspace>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<AccidentRepairCost> AccidentRepairCosts => Set<AccidentRepairCost>();
    public DbSet<FuelConsumed> FuelConsumptions => Set<FuelConsumed>();
    public DbSet<MaintenanceCost> MaintenanceCosts => Set<MaintenanceCost>();
    public DbSet<HirePayment> HirePayments => Set<HirePayment>();
    public DbSet<Location> Locations => Set<Location>();
}