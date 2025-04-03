using Odatey.FleetManagementSystem.Contracts.Requests.Vehicles;

namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Commands;

public record RemoveConsumptionCostCommand(
    Guid VehicleId,
    Guid Id,
    VehicleExpenditureType ExpenditureType) : ICommand<Unit>;

public class RemoveConsumptionCostCommandHandler(IVehicleRepository vehicleRepository) 
    : ICommandHandler<RemoveConsumptionCostCommand, Unit>
{
    public async Task<Unit> Handle(RemoveConsumptionCostCommand command, CancellationToken cancellationToken)
    {
        var existingVehicle = await vehicleRepository.GetByIdAsync(command.VehicleId);

        if (existingVehicle is null)
        {
            throw new NotFoundException($"Vehicle with Id {command.VehicleId} was not found");
        }

        switch (command.ExpenditureType)
        {
            case VehicleExpenditureType.FuelConsumption:
                existingVehicle.RemoveFuelConsumption(command.Id);
                break;
            case VehicleExpenditureType.Maintenance:
                existingVehicle.RemoveMaintenance(command.Id);
                break;
            case VehicleExpenditureType.AccidentRepair:
                existingVehicle.RemoveAccidentRepairCost(command.Id);
                break;
            default:
                throw new BadRequestException("Invalid ExpenditureType");
        }

        await vehicleRepository.SaveChangesAsync();
        
        return Unit.Value;
    }
}