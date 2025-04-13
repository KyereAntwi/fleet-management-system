namespace Odatey.FleetManagementSystem.Api.Endpoints.Reports;

public class GetRoadWorthyRenewals(ISender sender) 
    : Endpoint<GetRoadWorthyRenewalsRequest, BaseResponse<int>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/reports/roadworthy-renewals");
    }

    public override async Task HandleAsync(GetRoadWorthyRenewalsRequest req, CancellationToken ct)
    {
        var vehicles = await 
            sender.Send(new GetVehiclesDueForRoadWorthyRenewalsQuery(
                req.WorkspaceId, 
                string.IsNullOrWhiteSpace(req.Period) ? string.Empty : req.Period), ct);

        await SendOkAsync(new BaseResponse<int>
        {
            Success = true,
            StatusCode = (int)HttpStatusCode.OK,
            Data = vehicles,
            Message = "Vehicles retrieved successfully"
        }, ct);
    }
}

public record GetRoadWorthyRenewalsRequest(
    [FromRoute] Guid WorkspaceId,
    [Microsoft.AspNetCore.Mvc.FromQuery] string Period);