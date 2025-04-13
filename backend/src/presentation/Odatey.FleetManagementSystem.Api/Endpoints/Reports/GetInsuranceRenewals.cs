namespace Odatey.FleetManagementSystem.Api.Endpoints.Reports;

public class GetInsuranceRenewals(ISender sender) 
    : Endpoint<GetInsuranceRenewalsRequest, BaseResponse<int>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/reports/insurance-renewals");
    }

    public override async Task HandleAsync(GetInsuranceRenewalsRequest req, CancellationToken ct)
    {
        var result = 
            await sender.Send(new GetVehiclesDueForInsuranceRenewalsQuery(
                req.WorkspaceId,
                string.IsNullOrWhiteSpace(req.Period) ? string.Empty : req.Period), ct);
        
        await SendOkAsync(new BaseResponse<int>
        {
            Data = result,
            Message = "Insurance renewals retrieved successfully",
            StatusCode = StatusCodes.Status200OK
        }, ct);
    }
}

public record GetInsuranceRenewalsRequest(
    [FromRoute] Guid WorkspaceId,
    [Microsoft.AspNetCore.Mvc.FromQuery] string Period);