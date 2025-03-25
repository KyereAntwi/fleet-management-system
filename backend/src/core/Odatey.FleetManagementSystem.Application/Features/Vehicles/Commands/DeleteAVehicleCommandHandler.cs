namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Commands;

public record DeleteAVehicleCommand(Guid VehicleId) : ICommand;

public class DeleteAVehicleCommandHandler(IVehicleRepository vehicleRepository) : ICommandHandler<DeleteAVehicleCommand>
{
    public async Task<Unit> Handle(DeleteAVehicleCommand command, CancellationToken cancellationToken)
    {
        var existingVehicle = await vehicleRepository.GetByIdAsync(command.VehicleId);

        if (existingVehicle is null)
        {
            throw new NotFoundException($"Vehicle with Id {command.VehicleId} was not found");
        }
        
        await vehicleRepository.DeleteAsync(existingVehicle);
        await vehicleRepository.SaveChangesAsync();
        
        return Unit.Value;
    }
}