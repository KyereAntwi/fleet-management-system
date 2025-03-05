namespace Odatey.FleetManagementSystem.Api.Endpoints.TenantsManagement;

public class GetTenant(ISender sender) 
    : Endpoint<GetTenantRequest, BaseResponse<GetTenantQueryDto>>
{
    public override void Configure()
    {
        Get("/api/v1/tenants/{userId}");
    }

    public override async Task HandleAsync(GetTenantRequest req, CancellationToken ct)
    {
        var result = await sender.Send(new GetTenantQuery(req.UserId), ct);

        await SendAsync(new BaseResponse<GetTenantQueryDto>
        {
            Data = result,
            StatusCode = 200,
            Message = "Success",
            Success = true
        }, cancellation: ct);
    }
}