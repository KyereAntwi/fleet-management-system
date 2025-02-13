namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Commands;

public record AddFuelConsumptionToVehicleCommand(
    Guid VehicleId,
    double FuelConsumptionCost) : ICommand;

public class AddFuelConsumptionToVehicleCommandHandler(IAsyncRepository<Vehicle> repository) 
    : ICommandHandler<AddFuelConsumptionToVehicleCommand, Unit>
{
    public async Task<Unit> Handle(AddFuelConsumptionToVehicleCommand command, CancellationToken cancellationToken)
    {
        var vehicle = await repository.GetByIdAsync(command.VehicleId);

        if (vehicle is null)
        {
            throw new NotFoundException($"Vehicle with id {command.VehicleId} does not exist");
        }
        
        vehicle.AddFuelConsumption(command.FuelConsumptionCost);
        await repository.SaveChangesAsync();
        
        return Unit.Value;
    }
}