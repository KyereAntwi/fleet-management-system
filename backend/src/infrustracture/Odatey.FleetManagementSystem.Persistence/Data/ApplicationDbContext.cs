namespace Odatey.FleetManagementSystem.Repositories.Data;

public class ApplicationDbContext : DbContext
{
    private readonly ITenantRepository _tenantRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        ITenantRepository tenantRepository,
        IHttpContextAccessor httpContextAccessor) : base(options)
    {
        _tenantRepository = tenantRepository;
        _httpContextAccessor = httpContextAccessor;
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<IEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedBy = _httpContextAccessor.HttpContext.User.Identity?.Name;
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedBy = _httpContextAccessor.HttpContext.User.Identity?.Name;
                    break;
            }
        }
        
        return await base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var newTenantId = _httpContextAccessor.HttpContext?.Request.Headers["X-Tenant-Id"].ToString();

        if (string.IsNullOrEmpty(newTenantId)) throw new BadRequestException("Missing tenant id from the request headers.");
        
        var connectionString = _tenantRepository.GetConnectionStringAsync(newTenantId).Result;
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
}