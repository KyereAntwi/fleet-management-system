namespace Odatey.FleetManagementSystem.Contracts.Requests.Vehicles;

public record GetAllVehiclesRequest(
    Guid WorkspaceId,
    string Keyword = "",
    int Page = 1,
    int PageSize = 20);