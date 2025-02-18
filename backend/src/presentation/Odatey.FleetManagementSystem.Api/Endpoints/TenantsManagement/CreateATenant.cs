namespace Odatey.FleetManagementSystem.Api.Endpoints.TenantsManagement;

public class CreateATenant : Endpoint<CreateATenantRequest>
{
    private readonly ISender _sender;

    public CreateATenant(ISender sender) => _sender = sender;

    public override void Configure()
    {
        Post("/api/v1/tenants");
    }

    public override async Task HandleAsync(CreateATenantRequest req, CancellationToken ct)
    {
        _ = TryParse<Subscription>(req.Subscription, out var subscription);
        await _sender.Send(new CreateATenantCommand(req.UserId, subscription), ct);

        await SendNoContentAsync(ct);
    }
}

public class CreateATenantRequestValidator : Validator<CreateATenantRequest>
{
    public CreateATenantRequestValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("UserId cannot be empty")
            .NotNull();
        
        RuleFor(x => x.Subscription)
            .NotEmpty().WithMessage("Subscription cannot be empty")
            .IsEnumName(typeof(Subscription), true).WithMessage("Subscription should contain valid subscription")
            .NotNull();
    }
}