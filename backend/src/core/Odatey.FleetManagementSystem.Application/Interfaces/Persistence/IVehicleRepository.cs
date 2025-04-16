namespace Odatey.FleetManagementSystem.Application.Interfaces.Persistence;

public interface IVehicleRepository : IAsyncRepository<Vehicle>
{
    Task<(int, IReadOnlyList<Vehicle>)> GetPagedListAsync(
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
        int size);
    Task<Vehicle?> GetVehicleWithDetailsAsync(Guid vehicleId);
    Task AddRangeAsync(IEnumerable<Vehicle> vehicles);
    Task<Vehicle?> GetByIdAsync(Guid id);
}