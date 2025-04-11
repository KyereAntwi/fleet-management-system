using Odatey.FleetManagementSystem.Application.Features.Reports.Queries;

namespace Odatey.FleetManagementSystem.Api.Endpoints.Reports;

public class GetRoadWorthyRenewals(ISender sender) 
    : Endpoint<GetRoadWorthyRenewalsRequest, BaseResponse<IEnumerable<GetAllVehicleQueryDto>>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/reports/getRoadWorthyRenewals");
    }

    public override async Task HandleAsync(GetRoadWorthyRenewalsRequest req, CancellationToken ct)
    {
        var vehicles = await sender.Send(new GetVehiclesDueForRoadWorthyRenewalsQuery(req.WorkspaceId), ct);

        await SendOkAsync(new BaseResponse<IEnumerable<GetAllVehicleQueryDto>>
        {
            Success = true,
            StatusCode = (int)HttpStatusCode.OK,
            Data = vehicles,
            Message = "Vehicles retrieved successfully"
        }, ct);
    }
}

public record GetRoadWorthyRenewalsRequest([FromRoute] Guid WorkspaceId);