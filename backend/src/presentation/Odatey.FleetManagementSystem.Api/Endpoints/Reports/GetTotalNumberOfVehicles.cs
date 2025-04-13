namespace Odatey.FleetManagementSystem.Api.Endpoints.Reports;

public class GetTotalNumberOfVehicles(ISender sender) 
    : Endpoint<GetTotalNumberOfVehiclesRequest, BaseResponse<int>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/reports/number-of-vehicles");
    }

    public override async Task HandleAsync(GetTotalNumberOfVehiclesRequest req, CancellationToken ct)
    {
        var response = await sender.Send(new GetTotalNumberOfVehiclesQuery(
        req.WorkspaceId,
        string.IsNullOrWhiteSpace(req.FromDate) ? new DateTime() : DateTime.SpecifyKind(DateTime.Parse(req.FromDate), DateTimeKind.Utc),
        string.IsNullOrWhiteSpace(req.ToDate) ? new DateTime() : DateTime.SpecifyKind(DateTime.Parse(req.ToDate), DateTimeKind.Utc)), 
            ct);

        await SendOkAsync(new BaseResponse<int>
        {
            Success = true,
            StatusCode = (int)HttpStatusCode.OK,
            Data = response,
            Message = "Total number of vehicles retrieved successfully"
        }, ct);
    }
}

public record GetTotalNumberOfVehiclesRequest(
    [FromRoute] Guid WorkspaceId,
    [Microsoft.AspNetCore.Mvc.FromQuery] string FromDate,
    [Microsoft.AspNetCore.Mvc.FromQuery] string ToDate);