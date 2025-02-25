using Microsoft.AspNetCore.Http;

namespace Odatey.FleetManagementSystem.Api.Endpoints.TenantsManagement;

public class AddUserToTenant(ISender sender, IHttpContextAccessor httpContextAccessor) : Endpoint<AddUserToTenantRequest>
{
    public override void Configure()
    {
        Post("/api/v1/tenants/user");
    }

    public override async Task HandleAsync(AddUserToTenantRequest req,
        CancellationToken ct)
    {
        var tenantId = httpContextAccessor.HttpContext?.Request.Headers["X-Tenant-Id"].ToString();

        if (string.IsNullOrWhiteSpace(tenantId))
            throw new BadRequestException("[X-Tenant-Id] was missing from the request header.");

        await sender.Send(new AddUserToTenantCommand(req.UserId, tenantId), ct);

        await SendNoContentAsync(ct);
    }
}

public class AddUserToTenantRequestValidator : Validator<AddUserToTenantRequest>
{
    public AddUserToTenantRequestValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("UserId cannot be empty")
            .NotNull();
    }
}