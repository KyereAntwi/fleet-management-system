using Microsoft.AspNetCore.Http;

namespace Odatey.FleetManagementSystem.ExternalServices.Services;

public class AuthenticatedUser(IHttpContextAccessor httpContextAccessor) 
    : IAuthenticatedUser
{
    public string? UserId => httpContextAccessor.HttpContext.User.Identity?.Name!;

    public string? TenantId => httpContextAccessor.HttpContext?.Request.Headers["X-Tenant-Id"].ToString();
}