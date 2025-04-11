namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Commands;

public record AddHirePaymentCommand(Guid VehicleId, double HirePayment) : ICommand;

public class AddHirePaymentCommandHandler(IVehicleRepository repository) 
    : ICommandHandler<AddHirePaymentCommand>
{
    public async Task<Unit> Handle(AddHirePaymentCommand command, CancellationToken cancellationToken)
    {
        var existingVehicle = await repository.GetByIdAsync(command.VehicleId);

        if (existingVehicle is null)
        {
            throw new NotFoundException($"Vehicle with Id {command.VehicleId} was not found");
        }
        
        existingVehicle.AddHirePayment(command.HirePayment, DateTime.UtcNow);

        await repository.SaveChangesAsync();
        
        return Unit.Value;
    }
}