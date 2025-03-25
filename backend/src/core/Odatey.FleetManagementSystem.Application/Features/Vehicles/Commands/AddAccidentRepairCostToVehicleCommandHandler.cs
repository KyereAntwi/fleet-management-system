namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Commands;

public record AddAccidentRepairCostToVehicleCommand(
    Guid VehicleId,
    double AccidentRepairCost) : ICommand;

public class AddAccidentRepairCostToVehicleCommandHandler(IVehicleRepository repository) 
    : ICommandHandler<AddAccidentRepairCostToVehicleCommand, Unit>
{
    public async Task<Unit> Handle(AddAccidentRepairCostToVehicleCommand command, CancellationToken cancellationToken)
    {
        var vehicle = await repository.GetByIdAsync(command.VehicleId);

        if (vehicle is null)
        {
            throw new NotFoundException($"Vehicle with id {command.VehicleId} does not exist");
        }
        
        vehicle.AddAccidentRepairCost(command.AccidentRepairCost, DateTime.UtcNow);
        await repository.SaveChangesAsync();
        
        return Unit.Value;
    }
}