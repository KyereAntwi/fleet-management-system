namespace Odatey.FleetManagementSystem.Application.Interfaces.Persistence;

public interface IWorkspaceRepository
{
    Task<Workspace?> GetByIdAsync(Guid id);
}