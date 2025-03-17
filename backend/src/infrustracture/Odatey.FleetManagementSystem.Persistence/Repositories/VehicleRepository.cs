namespace Odatey.FleetManagementSystem.Repositories.Repositories;

public class VehicleRepository(ApplicationDbContext dbContext) : AsyncRepository<Vehicle>(dbContext), IVehicleRepository
{
    private readonly ApplicationDbContext _dbContext = dbContext;

    public async Task<(int, IReadOnlyList<Vehicle>)> GetPagedListAsync(Guid workspaceId, string queryKey, int page, int size)
    {
        var query = _dbContext.Vehicles.Where(v => v.WorkspaceId.Value == workspaceId).AsNoTracking().AsQueryable();

        if (!string.IsNullOrEmpty(queryKey))
        {
            query = query.Where(v => v.BrandAndType != null && v.BrandAndType.ToLower().Contains(queryKey.ToLower()));
        }
        
        var pagedLis = query.OrderBy(v => v.CreatedAt).Skip((page - 1) * size).Take(size).ToList();
        var totalCount = await query.CountAsync();
        
        return (totalCount, pagedLis);
    }

    public async Task<Vehicle?> GetVehicleWithDetailsAsync(Guid vehicleId)
    {
        return await _dbContext
            .Vehicles
            .Include(v => v.FuelConsumptions)
            .Include(v => v.MaintenanceCosts)
            .Include(v => v.AccidentRepairCosts)
            .AsSplitQuery()
            .AsNoTracking()
            .FirstOrDefaultAsync(v => v.Id.Value == vehicleId);
    }

    public async Task AddRangeAsync(IEnumerable<Vehicle> vehicles)
    {
        _dbContext.AddRange(vehicles);
        await Task.CompletedTask;
    }

    public Task<Vehicle?> GetByIdAsync(Guid id)
    {
        return _dbContext.Vehicles.FirstOrDefaultAsync(v => v.Id.Value == id);
    }
}