namespace Odatey.FleetManagementSystem.Repositories.Repositories;

public class WorkspaceRepository(ApplicationDbContext dbContext) : AsyncRepository<Workspace>(dbContext), IWorkspaceRepository
{
    private readonly ApplicationDbContext _dbContext = dbContext;
    public Task<Workspace?> GetByIdAsync(Guid id)
    {
        var actualId = WorkspaceId.Of(id);
        return _dbContext.Workspaces.FirstOrDefaultAsync(w => w.Id == actualId);
    }
}