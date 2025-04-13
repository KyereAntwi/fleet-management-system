namespace Odatey.FleetManagementSystem.Application.Interfaces.Persistence;

public interface IReportsRepository
{
    Task<int> GetVehiclesDueForRoadworthyRenewalAsync(Guid workspaceId, string period);
    Task<int> GetVehiclesDueForInsuranceRenewalAsync(Guid workspaceId, string period);
    Task<double> GetTotalCostOfFleetsPerWorkspaceAsync(Guid workspaceId, DateTime fromDate, DateTime toDate);
    Task<double> GetTotalCostOfFuelConsumptionAsync(Guid workspaceId, DateTime fromDate, DateTime toDate);
    Task<double> GetTotalCostOfMaintenanceAsync(Guid workspaceId, DateTime fromDate, DateTime toDate);
    Task<double> GetTotalCostOfAccidentRepairsAsync(Guid workspaceId, DateTime fromDate, DateTime toDate);
    Task<int> TotalNumberOfVehiclesAsync(Guid workspaceId, DateTime fromDate, DateTime toDate);
}