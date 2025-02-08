namespace Odatey.FleetManagementSystem.Domain.Abstractions;

public abstract class BaseEntity<T> : IEntity<T>
{
    public DateTime? CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTime? DeletedAt { get; set; }
    public string? DeletedBy { get; set; }
    public T Id { get; set; }
}