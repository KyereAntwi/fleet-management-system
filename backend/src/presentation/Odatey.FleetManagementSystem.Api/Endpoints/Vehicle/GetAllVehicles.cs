using Odatey.FleetManagementSystem.Application.Features.Vehicles.Queries;
using Odatey.FleetManagementSystem.Application.Utilities.Dtos;

namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class GetAllVehicles(ISender sender) : Endpoint<GetAllVehiclesRequest, BaseResponse<PagedResponse<GetAllVehicleQueryDto>>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/vehicles");
    }

    public override async Task HandleAsync(GetAllVehiclesRequest req, CancellationToken ct)
    {
        var vehicles = await sender.Send(new GetAllVehiclesQuery(req.WorkspaceId, req.Keyword, req.Page, req.PageSize), ct);
        if (vehicles is null)
        {
            await SendNotFoundAsync(ct);
            return;
        }
        await SendAsync(new BaseResponse<PagedResponse<GetAllVehicleQueryDto>>
        {
            Success = true,
            StatusCode = (int)HttpStatusCode.OK,
            Data = vehicles,
            Message = "Vehicles retrieved successfully"
        }, cancellation: ct);
    }
}
