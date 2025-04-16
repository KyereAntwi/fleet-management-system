namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class GetAllVehicles(ISender sender) : Endpoint<GetAllVehiclesRequest, BaseResponse<PagedResponse<GetAllVehicleQueryDto>>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/vehicles");
    }

    public override async Task HandleAsync(GetAllVehiclesRequest req, CancellationToken ct)
    {
        var vehicles = await sender
            .Send(new GetAllVehiclesQuery(
                req.WorkspaceId, 
                req.Keyword, 
                req.InitialCostFrom,
                req.InitialCostTo,
                req.AnnualDepreciationFrom,
                req.AnnualDepreciationTo,
                req.MileageCovered,
                string.IsNullOrWhiteSpace(req.RoadworthyRenewalDateFrom) ? DateTime.MinValue : DateTime.SpecifyKind(DateTime.Parse(req.RoadworthyRenewalDateFrom), DateTimeKind.Utc),
                string.IsNullOrWhiteSpace(req.RoadworthyRenewalDateTo) ? DateTime.MinValue : DateTime.SpecifyKind(DateTime.Parse(req.RoadworthyRenewalDateTo), DateTimeKind.Utc),
                string.IsNullOrWhiteSpace(req.InsuranceRenewalDateFrom) ? DateTime.MinValue : DateTime.SpecifyKind(DateTime.Parse(req.InsuranceRenewalDateFrom), DateTimeKind.Utc),
                string.IsNullOrWhiteSpace(req.InsuranceRenewalDateTo) ? DateTime.MinValue : DateTime.SpecifyKind(DateTime.Parse(req.InsuranceRenewalDateTo), DateTimeKind.Utc),
                req.Page, 
                req.PageSize), ct);
        
        await SendAsync(new BaseResponse<PagedResponse<GetAllVehicleQueryDto>>
        {
            Success = true,
            StatusCode = (int)HttpStatusCode.OK,
            Data = vehicles,
            Message = "Vehicles retrieved successfully"
        }, cancellation: ct);
    }
}
