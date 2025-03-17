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

        var hashSet = new HashSet<string> { ".csv", ".xlsx", ".xls", ".xlsm" };
        var fileExtension = Path.GetExtension(command.File.FileName).ToLowerInvariant();
        if (!hashSet.Contains(fileExtension))
        {
            throw new BadFileExtensionException($"File extension {fileExtension} is not supported");
        }
        
        var list = csvService.ImportVehicles(command.File);

        var newVehicles = list.Select(v => Vehicle.Create(
            VehicleId.Of(Guid.NewGuid()),
            WorkspaceId.Of(command.WorkspaceId),
            "",
            v.VehicleCost,
            v.MileageCovered.ToString(),
            v.RoadworthyRenewalDate,
            v.InsuranceRenewalDate));
        
        await repository.AddRangeAsync(newVehicles);
        await repository.SaveChangesAsync();
        
        return Unit.Value;
    }
}