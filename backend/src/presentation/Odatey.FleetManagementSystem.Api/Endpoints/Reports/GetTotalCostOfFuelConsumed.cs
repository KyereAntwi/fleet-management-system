namespace Odatey.FleetManagementSystem.Api.Endpoints.Reports;

public class GetTotalCostOfFuelConsumed(ISender sender) : Endpoint<GetTotalCostOfFuelConsumedRequest, BaseResponse<double>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/reports/total-cost-of-fuel-consumed");
    }

    public override async Task HandleAsync(GetTotalCostOfFuelConsumedRequest req, CancellationToken ct)
    {
        var response = await sender.Send(new GetTotalFuelConsumptionsQuery(
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

public record GetTotalCostOfFuelConsumedRequest(
    [FromRoute] Guid WorkspaceId,
    [FromRoute] string FromDate,
    [FromRoute] string ToDate);