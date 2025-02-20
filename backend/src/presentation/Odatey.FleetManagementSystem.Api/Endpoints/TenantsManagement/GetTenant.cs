namespace Odatey.FleetManagementSystem.Api.Endpoints.TenantsManagement;

public class GetTenant(ISender sender, IHttpContextAccessor httpContextAccessor) 
    : EndpointWithoutRequest<BaseResponse<GetTenantQueryDto>>
{
    public override void Configure()
    {
        Get("/api/v1/tenants");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var tenantId = httpContextAccessor.HttpContext?.Request.Headers["X-Tenant-Id"].ToString();
        
        if (!string.IsNullOrWhiteSpace(tenantId))
            throw new BadRequestException("[X-Tenant-Id] was missing from the request header.");
        
        var result = await sender.Send(new GetTenantQuery(tenantId!), ct);

        await SendAsync(new BaseResponse<GetTenantQueryDto>
        {
            Data = result,
            StatusCode = 200,
            Message = "Success",
            Success = true
        }, cancellation: ct);
    }
}