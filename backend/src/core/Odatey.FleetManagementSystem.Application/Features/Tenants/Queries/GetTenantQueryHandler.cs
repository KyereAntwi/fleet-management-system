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
            throw new NotFoundException($"Tenant with id {request.UserId} does not exist");
        }

        return new GetTenantQueryDto(tenant.Id.Value, tenant.ConnectionString, tenant.CreatedAt);
    }
}

public record GetTenantQueryDto(Guid Id, string ConnectionString, DateTime? CreatedAt);