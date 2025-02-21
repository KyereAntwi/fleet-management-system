namespace Odatey.FleetManagementSystem.Api.Endpoints.TenantsManagement;

public class CreateATenant(ISender sender) : Endpoint<CreateATenantRequest, BaseResponse<string>>
{
    public override void Configure()
    {
        Post("/api/v1/tenants");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CreateATenantRequest req, CancellationToken ct)
    {
        _ = TryParse<Subscription>(req.Subscription, out var subscription);
        var result = await sender.Send(new CreateATenantCommand(req.UserId, subscription), ct);

        await SendAsync(new BaseResponse<string>
        {
            Data = result,
            StatusCode = 200,
            Success = true,
            Message = "Success"
        }, cancellation: ct);
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
            .IsEnumName(typeof(Subscription)).WithMessage("Subscription should contain valid subscription")
            .NotNull();
    }
}