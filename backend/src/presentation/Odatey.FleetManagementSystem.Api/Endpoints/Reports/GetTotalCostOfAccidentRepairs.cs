namespace Odatey.FleetManagementSystem.Api.Endpoints.Reports;

public class GetTotalCostOfAccidentRepairs(ISender sender) 
    : Endpoint<GetTotalCostOfAccidentRepairsRequest, BaseResponse<double>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/reports/total-cost-of-accident-repairs");
    }

    public override async Task HandleAsync(GetTotalCostOfAccidentRepairsRequest req, CancellationToken ct)
    {
        var response = await sender.Send(new GetTotalCostOfAccidentRepairsQuery(
            req.WorkspaceId, 
            string.IsNullOrWhiteSpace(req.FromDate) ? new DateTime() : DateTime.SpecifyKind(DateTime.Parse(req.FromDate), DateTimeKind.Utc), 
            string.IsNullOrWhiteSpace(req.ToDate) ? new DateTime() : DateTime.SpecifyKind(DateTime.Parse(req.ToDate), DateTimeKind.Utc)
        ), ct);

        await SendOkAsync(new BaseResponse<double>
        {
            StatusCode = (int)HttpStatusCode.OK,
            Success = true,
            Message = "Total cost of fuel consumed",
            Data = response
        }, ct);
    }
}

public record GetTotalCostOfAccidentRepairsRequest(
    [FromRoute] Guid WorkspaceId, 
    [Microsoft.AspNetCore.Mvc.FromQuery] string FromDate,
    [Microsoft.AspNetCore.Mvc.FromQuery] string ToDate);