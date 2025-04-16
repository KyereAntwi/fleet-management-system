namespace Odatey.FleetManagementSystem.Contracts.Requests.Vehicles;

public record GetAllVehiclesRequest(
    Guid WorkspaceId,
    string Keyword = "",
    double InitialCostFrom = 0,
    double InitialCostTo = 0,
    decimal AnnualDepreciationFrom = 0,
    decimal AnnualDepreciationTo = 0,
    string MileageCovered = "",
    string RoadworthyRenewalDateFrom = "",
    string RoadworthyRenewalDateTo = "",
    string InsuranceRenewalDateFrom = "",
    string InsuranceRenewalDateTo = "",
    int Page = 1,
    int PageSize = 20);