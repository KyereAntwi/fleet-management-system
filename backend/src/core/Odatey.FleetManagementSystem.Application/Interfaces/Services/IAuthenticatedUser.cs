namespace Odatey.FleetManagementSystem.Application.Interfaces.Services;

public interface IAuthenticatedUser
{
    string? UserId { get; }
    string? TenantId { get; }
}