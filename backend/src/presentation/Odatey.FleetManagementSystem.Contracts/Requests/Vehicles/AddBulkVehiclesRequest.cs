namespace Odatey.FleetManagementSystem.Contracts.Requests.Vehicles;

public record AddBulkVehiclesRequest(
    Guid WorkspaceId,
    IFormFile File);