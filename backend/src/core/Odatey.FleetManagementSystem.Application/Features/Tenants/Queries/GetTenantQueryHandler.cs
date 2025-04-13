using Odatey.FleetManagementSystem.Application.Interfaces.Services;

namespace Odatey.FleetManagementSystem.Application.Features.Tenants.Queries;

public record GetTenantQuery : IQuery<GetTenantQueryDto>;
    
public class GetTenantQueryHandler(
    ITenantRepository repository,
    IAuthenticatedUser authenticatedUser) 
    : IQueryHandler<GetTenantQuery, GetTenantQueryDto>
{
    public async Task<GetTenantQueryDto> Handle(GetTenantQuery request, CancellationToken cancellationToken)
    {
        var tenant = await repository.GetTenantByUserIdAsync(authenticatedUser.UserId);

        if (tenant is null)
        {
            throw new NotFoundException($"Tenant with id {authenticatedUser.UserId} does not exist");
        }

        return new GetTenantQueryDto(
            tenant.Id.Value, 
            tenant.ConnectionString,
            tenant.Subscription.ToString(),
            tenant.CreatedAt);
    }
}

public record GetTenantQueryDto(Guid Id, string ConnectionString, string SubscriptionType, DateTime? CreatedAt);