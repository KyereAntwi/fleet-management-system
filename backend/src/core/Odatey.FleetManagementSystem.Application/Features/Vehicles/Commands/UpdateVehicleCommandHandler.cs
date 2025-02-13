namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Commands;

public record UpdateVehicleCommand(
    Guid Id,
    string BrandAndType,
    double InitialCost,
    string MileageCovered,
    DateTime RoadworthyRenewalDate,
    DateTime InsuranceRenewalDate) : ICommand;

public class UpdateVehicleCommandHandler(IAsyncRepository<Vehicle> context) : ICommandHandler<UpdateVehicleCommand>
{
    public async Task<Unit> Handle(UpdateVehicleCommand command, CancellationToken cancellationToken)
    {
        var vehicleId = VehicleId.Of(command.Id);
        var vehicle = await context.GetByIdAsync(vehicleId.Value);

        if (vehicle is null)
        {
            throw new NotFoundException($"Vehicle with id {command.Id} not found");
        }
        
        vehicle.Update(
            command.BrandAndType,
            command.InitialCost,
            command.MileageCovered,
            command.RoadworthyRenewalDate,
            command.InsuranceRenewalDate);
        
        await context.SaveChangesAsync();
        
        return Unit.Value;
    }
}