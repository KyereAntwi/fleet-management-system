namespace Odatey.FleetManagementSystem.Application.Features.Tenants.Queries;

public record GetTenantQuery(string TenantId) : IQuery<GetTenantQueryDto>;
    
public class GetTenantQueryHandler(ITenantRepository repository) 
    : IQueryHandler<GetTenantQuery, GetTenantQueryDto>
{
    public async Task<GetTenantQueryDto> Handle(GetTenantQuery request, CancellationToken cancellationToken)
    {
        var tenant = await repository.GetTenantAsync(request.TenantId);

        if (tenant is null)
        {
            throw new NotFoundException($"Tenant with id {request.TenantId} does not exist");
        }

        return new GetTenantQueryDto(tenant.Id.Value, tenant.ConnectionString, tenant.CreatedAt);
    }
}

public record GetTenantQueryDto(Guid Id, string ConnectionString, DateTime? CreatedAt);