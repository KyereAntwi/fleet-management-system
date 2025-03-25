namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Commands;

public record AddMaintenanceCostToVehicleCommand(
    Guid VehicleId,
    double MaintenanceCost) : ICommand;

public class AddMaintenanceCostToVehicleCommandHandler(IVehicleRepository repository) 
    : ICommandHandler<AddMaintenanceCostToVehicleCommand, Unit>
{
    public async Task<Unit> Handle(AddMaintenanceCostToVehicleCommand command, CancellationToken cancellationToken)
    {
        var vehicle = await repository.GetByIdAsync(command.VehicleId);

        if (vehicle is null)
        {
            throw new NotFoundException($"Vehicle with id {command.VehicleId} does not exist");
        }
        
        vehicle.AddMaintenanceCost(command.MaintenanceCost, DateTime.UtcNow);
        await repository.SaveChangesAsync();
        
        return Unit.Value;
    }
}