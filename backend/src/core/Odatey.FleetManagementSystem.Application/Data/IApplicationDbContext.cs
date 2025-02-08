namespace Odatey.FleetManagementSystem.Application.Data;

public interface IApplicationDbContext
{
    DbSet<Workspace> Workspaces { get; }
    DbSet<Vehicle> Vehicles { get; }
    DbSet<AccidentRepairCost> AccidentRepairCosts { get; }
    DbSet<FuelConsumed> FuelConsumptions { get; }
    DbSet<MaintenanceCost> MaintenanceCosts { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}