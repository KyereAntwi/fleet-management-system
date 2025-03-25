namespace Odatey.FleetManagementSystem.Api.Endpoints.Vehicle;

public class DeleteAVehicle(ISender sender) : Endpoint<DeleteAVehicleRequest>
{
    public override void Configure()
    {
        Delete("/api/v1/workspaces/{WorkspaceId}/vehicles/{VehicleId}");
    }

    public override async Task HandleAsync(DeleteAVehicleRequest req, CancellationToken ct)
    {
        await sender.Send(new DeleteAVehicleCommand(req.VehicleId), ct);
        await SendNoContentAsync(cancellation: ct);
    }
}

public record DeleteAVehicleRequest([FromRoute] Guid VehicleId);