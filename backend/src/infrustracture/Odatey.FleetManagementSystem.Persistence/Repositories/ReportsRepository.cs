namespace Odatey.FleetManagementSystem.Repositories.Repositories;

public class ReportsRepository(ApplicationDbContext dbContext) : IReportsRepository
{
    public async Task<int> GetVehiclesDueForRoadworthyRenewalAsync(Guid workspaceId,string period)
    {
        var query = dbContext
            .Vehicles
            .Where(v => v.WorkspaceId == WorkspaceId.Of(workspaceId))
            .AsNoTracking();
        
        query = period.Equals("past", StringComparison.OrdinalIgnoreCase) ? 
            query.Where(v => v.RoadworthyRenewalDate!.Value.Date < DateTime.UtcNow.Date) : 
            query.Where(v => v.RoadworthyRenewalDate!.Value.Date == DateTime.UtcNow.Date);
        
        return await query.CountAsync();
    }

    public async Task<int> GetVehiclesDueForInsuranceRenewalAsync(Guid workspaceId, string period)
    {
        var query = dbContext
            .Vehicles
            .Where(v => v.WorkspaceId == WorkspaceId.Of(workspaceId))
            .AsNoTracking();
        
        query = period.Equals("past", StringComparison.OrdinalIgnoreCase) ? 
            query.Where(v => v.InsuranceRenewalDate!.Value.Date < DateTime.UtcNow.Date) : 
            query.Where(v => v.InsuranceRenewalDate!.Value.Date == DateTime.UtcNow.Date);
        
        return await query.CountAsync();
    }

    public async Task<double> GetTotalCostOfFleetsPerWorkspaceAsync(Guid workspaceId, DateTime fromDate, DateTime toDate)
    {
        var query = dbContext
            .Vehicles
            .Where(v => v.WorkspaceId == WorkspaceId.Of(workspaceId))
            .AsNoTracking();

        if (fromDate != new DateTime())
        {
            query = query.Where(v => v.CreatedAt!.Value.Date >= fromDate.Date);
        }

        if (toDate != new DateTime())
        {
            query = query.Where(v => v.CreatedAt!.Value.Date <= toDate.Date);
        }
        
        return await query.SumAsync(v => v.InitialCost);
    }

    public async Task<double> GetTotalCostOfFuelConsumptionAsync(Guid workspaceId, DateTime fromDate, DateTime toDate)
    {
        var query = dbContext
            .Vehicles
            .Where(v => v.WorkspaceId == WorkspaceId.Of(workspaceId))
            .SelectMany(v => v.FuelConsumptions)
            .AsNoTracking();

        if (fromDate != new DateTime())
        {
            query = query.Where(f => f.CreatedAt!.Value.Date >= fromDate.Date);
        }

        if (toDate != new DateTime())
        {
            query = query.Where(f => f.CreatedAt!.Value.Date <= toDate.Date);
        }

        return await query.SumAsync(v => v.FuelConsumedValue);
    }

    public async Task<double> GetTotalCostOfMaintenanceAsync(Guid workspaceId, DateTime fromDate, DateTime toDate)
    {
        var query = dbContext
            .Vehicles
            .Where(v => v.WorkspaceId == WorkspaceId.Of(workspaceId))
            .SelectMany(v => v.MaintenanceCosts)
            .AsNoTracking();

        if (fromDate != new DateTime())
        {
            query = query.Where(m => m.CreatedAt!.Value.Date >= fromDate.Date);
        }

        if (toDate != new DateTime())
        {
            query = query.Where(m => m.CreatedAt!.Value.Date <= toDate.Date);
        }
        
        return await query.SumAsync(m => m.Cost);
    }

    public async Task<double> GetTotalCostOfAccidentRepairsAsync(Guid workspaceId, DateTime fromDate, DateTime toDate)
    {
        var query = dbContext
            .Vehicles
            .Where(v => v.WorkspaceId == WorkspaceId.Of(workspaceId))
            .SelectMany(v => v.AccidentRepairCosts)
            .AsNoTracking();

        if (fromDate != new DateTime())
        {
            query = query.Where(a => a.CreatedAt!.Value.Date >= fromDate.Date);
        }

        if (toDate != new DateTime())
        {
            query = query.Where(a => a.CreatedAt!.Value.Date <= toDate.Date);
        }
        
        return await query.SumAsync(a => a.Cost);
    }

    public async Task<int> TotalNumberOfVehiclesAsync(Guid workspaceId, DateTime fromDate, DateTime toDate)
    {
        var query = dbContext
            .Vehicles
            .Where(v => v.WorkspaceId == WorkspaceId.Of(workspaceId))
            .AsNoTracking();

        if (fromDate != new DateTime())
        {
            query = query.Where(v => v.CreatedAt!.Value.Date >= fromDate.Date);
        }

        if (toDate != new DateTime())
        {
            query = query.Where(v => v.CreatedAt!.Value.Date <= toDate.Date);
        }
        
        return await query.CountAsync();
    }
}