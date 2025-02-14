namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Commands;

public record AddVehicleToWorkspaceCommand(
    Guid WorkspaceId,
    string BrandAndType,
    double InitialCost,
    string MileageCovered,
    DateTime RoadWorthyRenewalDate,
    DateTime InsuranceRenewalDate) : ICommand<AddVehicleToWorkspaceCommandResponse>;

public class AddVehicleToWorkspaceCommandHandler(
    IVehicleRepository vehicleRepository, 
    IAsyncRepository<Workspace> workspaceRepository) 
    : ICommandHandler<AddVehicleToWorkspaceCommand, AddVehicleToWorkspaceCommandResponse>
{
    public async Task<AddVehicleToWorkspaceCommandResponse> Handle(AddVehicleToWorkspaceCommand command, CancellationToken cancellationToken)
    {
        var workspace = await workspaceRepository.GetByIdAsync(command.WorkspaceId);

        if (workspace is null)
        {
            throw new NotFoundException($"Workspace with id {command.WorkspaceId} does not exist.");
        }

        var newVehicle = CreateVehicle(command);
        await vehicleRepository.AddAsync(newVehicle);
        await vehicleRepository.SaveChangesAsync();
        
        return new AddVehicleToWorkspaceCommandResponse(newVehicle.VehicleId.Value);
    }

    private static Vehicle CreateVehicle(AddVehicleToWorkspaceCommand command)
        => Vehicle.Create(
            VehicleId.Of(Guid.NewGuid()),
            WorkspaceId.Of(command.WorkspaceId), 
            command.BrandAndType,
            command.InitialCost,
            command.MileageCovered,
            command.RoadWorthyRenewalDate,
            command.InsuranceRenewalDate);
}

public record AddVehicleToWorkspaceCommandResponse(Guid Id);