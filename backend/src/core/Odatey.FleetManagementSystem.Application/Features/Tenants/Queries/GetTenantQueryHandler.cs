namespace Odatey.FleetManagementSystem.Application.Features.Tenants.Queries;

public record GetTenantQuery(string UserId) : IQuery<GetTenantQueryDto>;
    
public class GetTenantQueryHandler(ITenantRepository repository) 
    : IQueryHandler<GetTenantQuery, GetTenantQueryDto>
{
    public async Task<GetTenantQueryDto> Handle(GetTenantQuery request, CancellationToken cancellationToken)
    {
        var tenant = await repository.GetTenantByUserIdAsync(request.UserId);

        if (tenant is null)
        {
            throw new NotFoundException($"Tenant with user id {request.UserId} does not exist");
        }

        return new GetTenantQueryDto(tenant.Id.Value, tenant.CreatedAt);
    }
}

public record GetTenantQueryDto(Guid Id, DateTime? CreatedAt);