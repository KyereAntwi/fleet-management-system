using Odatey.FleetManagementSystem.Application.Interfaces.Services;

namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Commands;

public record AddBulkVehiclesFromFileToWorkspaceCommand(
    Guid WorkspaceId,
    IFormFile File) : ICommand;

public class AddBulkVehiclesFromFileToWorkspaceCommandHandler(
    IVehicleRepository repository, 
    IWorkspaceRepository workspacesRepository,
    ICsvService csvService) 
    : ICommandHandler<AddBulkVehiclesFromFileToWorkspaceCommand, Unit>
{
    public async Task<Unit> Handle(AddBulkVehiclesFromFileToWorkspaceCommand command, CancellationToken cancellationToken)
    {
        var workspace = await workspacesRepository.GetByIdAsync(command.WorkspaceId);

        if (workspace is null)
        {
            throw new NotFoundException($"Workspace with id {command.WorkspaceId} does not exist");
        }

        IEnumerable<CvsImportResult> list;

        try
        {
            list = csvService.ImportVehicles(command.File);
        }
        catch (Exception e)
        {
            throw new BadRequestException(e.Message);
        }

        List<Vehicle> newVehicles = [];

        foreach (var item in list)
        {
            var vehicle = Vehicle.Create(
                VehicleId.Of(Guid.NewGuid()),
                WorkspaceId.Of(command.WorkspaceId),
                "",
                item.VehicleCost,
                item.MileageCovered!,
                item.RoadworthyRenewalDate,
                item.InsuranceRenewalDate);
            
            vehicle.AddFuelConsumption(item.FuelConsumed, DateTime.UtcNow);
            vehicle.AddMaintenanceCost(item.MaintenanceCost, DateTime.UtcNow);
            vehicle.AddAccidentRepairCost(item.AccidentRepairCost, DateTime.UtcNow);
            
            newVehicles.Add(vehicle);
        }

        if (newVehicles.Count <= 0) return Unit.Value;
        
        await repository.AddRangeAsync(newVehicles);
        await repository.SaveChangesAsync();

        return Unit.Value;
    }
}