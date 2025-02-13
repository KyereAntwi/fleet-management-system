namespace Odatey.FleetManagementSystem.Application.Interfaces.Persistence;

public interface IVehicleRepository : IAsyncRepository<Vehicle>
{
    Task<(int, IReadOnlyList<Vehicle>)> GetPagedListAsync(Guid workspaceId, string queryKey, int page, int size);
    Task<Vehicle> GetVehicleWithDetailsAsync(Guid vehicleId);
    Task AddRangeAsync(IEnumerable<Vehicle> vehicles);
}