namespace Odatey.FleetManagementSystem.Repositories.Repositories;

public class WorkspaceRepository(ApplicationDbContext dbContext) : AsyncRepository<Workspace>(dbContext), IWorkspaceRepository
{
    private readonly ApplicationDbContext _dbContext = dbContext;
    public async Task<Workspace?> GetByIdAsync(Guid id)
    {
        var actualId = WorkspaceId.Of(id);
        return await _dbContext.Workspaces.FirstOrDefaultAsync(w => w.Id == actualId);
    }

    public async Task<Workspace?> GetByTitleAsync(string title)
    {
        return await _dbContext.Workspaces.FirstOrDefaultAsync(w => w.WorkspaceTitle == title);
    }
}