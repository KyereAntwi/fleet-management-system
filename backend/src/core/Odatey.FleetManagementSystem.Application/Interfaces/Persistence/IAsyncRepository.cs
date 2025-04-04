namespace Odatey.FleetManagementSystem.Application.Interfaces.Persistence;

public interface IAsyncRepository<T> where T : class
{
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<T> AddAsync(T entity);
    Task DeleteAsync(T entity);
    Task SaveChangesAsync();
}