namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class GetVehicle(ISender sender) : Endpoint<GetVehicleDetailsRequest, BaseResponse<VehicleDetailsQueryDto>>
{
    public override void Configure()
    {
        Get("/api/v1/workspaces/{WorkspaceId}/vehicles/{VehicleId}");
    }

    public override async Task HandleAsync(GetVehicleDetailsRequest req, CancellationToken ct)
    {
        var vehicle = await sender.Send(new GetAVehicleDetailsQuery(
            new GetAVehicleDetailsQueryRequest(req.VehicleId)), ct);
        
        await SendOkAsync(new BaseResponse<VehicleDetailsQueryDto>
        {
            Success = true,
            StatusCode = (int)HttpStatusCode.OK,
            Data = vehicle,
            Message = "Vehicle details retrieved successfully"
        }, ct);
    }
}

public record GetVehicleDetailsRequest ([FromRoute] Guid WorkspaceId, [FromRoute] Guid VehicleId);