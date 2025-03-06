
using Odatey.FleetManagementSystem.Application.Interfaces.Services;

namespace Odatey.FleetManagementSystem.Application.Features.Tenants.Commands;

public record UpdateTenantSubscriptionCommand(Subscription Subscription) : ICommand;

public class UpdateTenantSubscriptionCommandHandler(
    ITenantRepository tenantRepository,
    IAuthenticatedUser authenticatedUser) 
    : ICommandHandler<UpdateTenantSubscriptionCommand>
{
    public async Task<Unit> Handle(UpdateTenantSubscriptionCommand command, CancellationToken cancellationToken)
    {
        var existingTenant = await tenantRepository.GetTenantAsync(authenticatedUser.TenantId!);

        if (existingTenant is null)
        {
            throw new NotFoundException($"Tenant with Id {authenticatedUser.TenantId} was not found");
        }

        existingTenant.UpdateSubscription(command.Subscription);
        await tenantRepository.SaveChangesAsync();

        return Unit.Value;
    }
}
