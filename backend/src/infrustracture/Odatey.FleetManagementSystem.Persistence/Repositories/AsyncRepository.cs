namespace Odatey.FleetManagementSystem.Repositories.Repositories;

public class AsyncRepository<T>(ApplicationDbContext dbContext) : IAsyncRepository<T>
    where T : class
{
    public async Task<T?> GetByIdAsync(Guid id)
    {
        return await dbContext.Set<T>().FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> ListAllAsync()
    {
        return await dbContext.Set<T>().AsNoTracking().ToListAsync();
    }

    public async Task<T> AddAsync(T entity)
    {
        await dbContext.Set<T>().AddAsync(entity);
        return entity;
    }

    public async Task DeleteAsync(T entity)
    {
        dbContext.Set<T>().Remove(entity);
        await Task.CompletedTask;
    }

    public async Task SaveChangesAsync()
    {
        await dbContext.SaveChangesAsync();
    }
}