namespace Odatey.FleetManagementSystem.Api.Endpoints.Reports;

public class GetTotalCostOfFleets(ISender sender) 
    : Endpoint<GetTotalCostOfFleetsRequest, BaseResponse<double>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/reports/total-cost-of-fleets");
    }

    public override async Task HandleAsync(GetTotalCostOfFleetsRequest req, CancellationToken ct)
    {
        var totalCost = await 
            sender
                .Send(new GetTotalCostOfFleetsPerWorkspaceQuery(
                        req.WorkspaceId, 
                        string.IsNullOrWhiteSpace(req.FromDate) ? new DateTime() : DateTime.SpecifyKind(DateTime.Parse(req.FromDate), DateTimeKind.Utc), 
                        string.IsNullOrWhiteSpace(req.ToDate) ? new DateTime() : DateTime.SpecifyKind(DateTime.Parse(req.ToDate), DateTimeKind.Utc)), 
                    ct);
        
        await SendOkAsync(new BaseResponse<double>
        {
            Success = true,
            StatusCode = (int)HttpStatusCode.OK,
            Data = totalCost,
            Message = "Total cost of fleets retrieved successfully"
        }, ct);
    }
}

public record GetTotalCostOfFleetsRequest(
    [FromRoute] Guid WorkspaceId,
    [Microsoft.AspNetCore.Mvc.FromQuery] string? FromDate,
    [Microsoft.AspNetCore.Mvc.FromQuery] string? ToDate);