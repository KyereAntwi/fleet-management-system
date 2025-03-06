namespace Odatey.FleetManagementSystem.Api.Endpoints.TenantsManagement;

public class GetTenant(ISender sender) 
    : EndpointWithoutRequest<BaseResponse<GetTenantQueryDto>>
{
    public override void Configure()
    {
        Get("/api/v1/tenants");
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var result = await sender.Send(new GetTenantQuery(), ct);

        await SendAsync(new BaseResponse<GetTenantQueryDto>
        {
            Data = result,
            StatusCode = 200,
            Message = "Success",
            Success = true
        }, cancellation: ct);
    }
}