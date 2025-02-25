
using Microsoft.AspNetCore.Http;

namespace Odatey.FleetManagementSystem.Api.Endpoints.TenantsManagement;

public class UpdateTenantSubscription(ISender sender, IHttpContextAccessor httpContextAccessor) 
    : Endpoint<UpdateTenantSubscriptionRequest>
{
    public override void Configure()
    {
        Put("/api/v1/tenants/subscription");
    }

    public override async Task HandleAsync(UpdateTenantSubscriptionRequest req, CancellationToken ct)
    {
        var tenantId = httpContextAccessor.HttpContext?.Request.Headers["X-Tenant-Id"].ToString();

        if (string.IsNullOrWhiteSpace(tenantId))
            throw new BadRequestException("[X-Tenant-Id] was missing from the request header.");

        _ = TryParse<Subscription>(req.Subscription, out var subscription);

        await sender.Send(new UpdateTenantSubscriptionCommand(subscription, tenantId), ct);

        await SendNoContentAsync(ct);
    }
}

public class UpdateTenantSubscriptionRequestValidator : Validator<UpdateTenantSubscriptionRequest>
{
    public UpdateTenantSubscriptionRequestValidator()
    {
        RuleFor(x => x.Subscription)
            .NotEmpty().WithMessage("Subscription cannot be empty")
            .IsEnumName(typeof(Subscription)).WithMessage("Subscription should contain valid subscription")
            .NotNull();
    }
}
