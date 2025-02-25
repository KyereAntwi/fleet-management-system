using Odatey.FleetManagementSystem.Application.Features.Vehicles.Queries;

namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class GetVehicle(ISender sender) : Endpoint<GetAVehicleDetailsQueryRequest, BaseResponse<VehicleDetailsQueryDto>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/vehicles/{Id}");
    }

    public override async Task HandleAsync(GetAVehicleDetailsQueryRequest req, CancellationToken ct)
    {
        var vehicle = await sender.Send(new GetAVehicleDetailsQuery(req), ct);

        if (vehicle is null)
        {
            await SendNotFoundAsync(ct);
            return;
        }
        await SendOkAsync(new BaseResponse<VehicleDetailsQueryDto>
        {
            Success = true,
            StatusCode = (int)HttpStatusCode.OK,
            Data = vehicle,
            Message = "Vehicle details retrieved successfully"
        }, ct);
    }
}