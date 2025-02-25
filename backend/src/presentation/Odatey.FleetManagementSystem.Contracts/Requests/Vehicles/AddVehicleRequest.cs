namespace Odatey.FleetManagementSystem.Contracts.Requests.Vehicles;

public record AddVehicleRequest(
    Guid WorkspaceId,
    string BrandAndType,
    double InitialCost,
    string MileageCovered,
    DateTime RoadWorthyRenewalDate,
    DateTime InsuranceRenewalDate);