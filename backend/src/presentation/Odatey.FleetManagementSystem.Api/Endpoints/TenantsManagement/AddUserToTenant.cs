namespace Odatey.FleetManagementSystem.Api.Endpoints.TenantsManagement;

public class AddUserToTenant : Endpoint<AddUserToTenantRequest>
{
    public override void Configure()
    {
        Post("/api/v1/tenants/user");
    }

    public override async Task HandleAsync(AddUserToTenantRequest req,
        CancellationToken ct)
    {
        
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