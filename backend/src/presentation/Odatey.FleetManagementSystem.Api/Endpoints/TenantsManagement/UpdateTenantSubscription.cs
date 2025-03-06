namespace Odatey.FleetManagementSystem.Api.Endpoints.TenantsManagement;

public class UpdateTenantSubscription(ISender sender) 
    : Endpoint<UpdateTenantSubscriptionRequest>
{
    public override void Configure()
    {
        Put("/api/v1/tenants/subscription");
    }

    public override async Task HandleAsync(UpdateTenantSubscriptionRequest req, CancellationToken ct)
    {
        _ = TryParse<Subscription>(req.Subscription, out var subscription);

        await sender.Send(new UpdateTenantSubscriptionCommand(subscription), ct);

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
