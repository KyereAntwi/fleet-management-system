namespace Odatey.FleetManagementSystem.Repositories.Repositories;

public class VehicleRepository(ApplicationDbContext dbContext) : AsyncRepository<Vehicle>(dbContext), IVehicleRepository
{
    private readonly ApplicationDbContext _dbContext = dbContext;

    public async Task<(int, IReadOnlyList<Vehicle>)> GetPagedListAsync(
        Guid workspaceId, 
        string queryKey,
        double initialCostFrom,
        double initialCostTo,
        decimal annualDepreciationFrom,
        decimal annualDepreciationTo,
        string mileageCovered,
        DateTime roadworthyRenewalDateFrom,
        DateTime roadworthyRenewalDateTo,
        DateTime insuranceRenewalDateFrom,
        DateTime insuranceRenewalDateTo,
        int page, 
        int size)
    {
        var query = _dbContext.Vehicles.Where(v => v.WorkspaceId == WorkspaceId.Of(workspaceId)).AsNoTracking();

        query = FilterVehicles(queryKey, initialCostFrom, initialCostTo, annualDepreciationFrom, annualDepreciationTo, mileageCovered, roadworthyRenewalDateFrom, roadworthyRenewalDateTo, insuranceRenewalDateFrom, insuranceRenewalDateTo, query);

        var pagedLis = query.OrderBy(v => v.CreatedAt).Skip((page - 1) * size).Take(size);
        var totalCount = await query.CountAsync();
        
        return (totalCount, await pagedLis.ToListAsync());
    }

    public async Task<Vehicle?> GetVehicleWithDetailsAsync(Guid vehicleId)
    {
        try
        {
            var vehicle = await _dbContext
                .Vehicles
                .Include(v => v.FuelConsumptions)
                .Include(v => v.MaintenanceCosts)
                .Include(v => v.AccidentRepairCosts)
                .AsSplitQuery()
                .AsNoTracking()
                .FirstOrDefaultAsync(v => v.Id == VehicleId.Of(vehicleId));
            
            return vehicle;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task AddRangeAsync(IEnumerable<Vehicle> vehicles)
    {
        _dbContext.AddRange(vehicles);
        await Task.CompletedTask;
    }

    public async Task<Vehicle?> GetByIdAsync(Guid id)
    {
        return await _dbContext.Vehicles.FindAsync(VehicleId.Of(id));
    }
    
    private static IQueryable<Vehicle> FilterVehicles(string queryKey, double initialCostFrom, double initialCostTo,
        decimal annualDepreciationFrom, decimal annualDepreciationTo, string mileageCovered,
        DateTime roadworthyRenewalDateFrom, DateTime roadworthyRenewalDateTo, DateTime insuranceRenewalDateFrom,
        DateTime insuranceRenewalDateTo, IQueryable<Vehicle> query)
    {
        if (!string.IsNullOrEmpty(queryKey))
        {
            query = query.Where(v => v.BrandAndType!.ToLower().Contains(queryKey.ToLower()));
        }
        
        if (initialCostFrom > 0)
        {
            query = query.Where(v => v.InitialCost >= initialCostFrom);
        }
        
        if (initialCostTo > 0)
        {
            query = query.Where(v => v.InitialCost <= initialCostTo);
        }
        
        if (annualDepreciationFrom > 0)
        {
            query = query.Where(v => v.AnnualDepreciation >= annualDepreciationFrom);
        }
        
        if (annualDepreciationTo > 0)
        {
            query = query.Where(v => v.AnnualDepreciation <= annualDepreciationTo);
        }
        
        if (!string.IsNullOrEmpty(mileageCovered))
        {
            query = query.Where(v => v.MileageCovered!.ToLower().Contains(mileageCovered.ToLower()));
        }
        
        if (roadworthyRenewalDateFrom != DateTime.MinValue)
        {
            query = query.Where(v => v.RoadworthyRenewalDate!.Value.Date >= roadworthyRenewalDateFrom.Date);
        }
        
        if (roadworthyRenewalDateTo != DateTime.MinValue)
        {
            query = query.Where(v => v.RoadworthyRenewalDate!.Value.Date <= roadworthyRenewalDateTo.Date);
        }
        
        if (insuranceRenewalDateFrom != DateTime.MinValue)
        {
            query = query.Where(v => v.InsuranceRenewalDate!.Value.Date >= insuranceRenewalDateFrom.Date);
        }
        
        if (insuranceRenewalDateTo != DateTime.MinValue)
        {
            query = query.Where(v => v.InsuranceRenewalDate!.Value.Date <= insuranceRenewalDateTo.Date);
        }

        return query;
    }
}