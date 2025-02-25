
namespace Odatey.FleetManagementSystem.Application.Features.Tenants.Commands;

public record UpdateTenantSubscriptionCommand(Subscription Subscription, string TenantId) : ICommand;

public class UpdateTenantSubscriptionCommandHandler(ITenantRepository tenantRepository) 
    : ICommandHandler<UpdateTenantSubscriptionCommand>
{
    public async Task<Unit> Handle(UpdateTenantSubscriptionCommand command, CancellationToken cancellationToken)
    {
        var existingTenant = await tenantRepository.GetTenantAsync(command.TenantId);

        if (existingTenant is null)
        {
            throw new NotFoundException($"Tenant with Id {command.TenantId} was not found");
        }

        existingTenant.UpdateSubscription(command.Subscription);
        await tenantRepository.SaveChangesAsync();

        return Unit.Value;
    }
}
