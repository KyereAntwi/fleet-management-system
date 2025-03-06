using Odatey.FleetManagementSystem.Application.Interfaces.Services;

namespace Odatey.FleetManagementSystem.Application.Features.Tenants.Commands;

public record AddUserToTenantCommand(string UserId) : ICommand;

public class AddUserToTenantCommandHandler(
    ITenantRepository repository, 
    IAuthenticatedUser authenticatedUser) 
    : ICommandHandler<AddUserToTenantCommand>
{
    public async Task<Unit> Handle(AddUserToTenantCommand command, CancellationToken cancellationToken)
    {
        var existingTenant = await repository.GetTenantAsync(authenticatedUser.TenantId!);
        if (existingTenant is null)
        {
            throw new NotFoundException($"Tenant with id {authenticatedUser.TenantId} does not exist");
        }
        
        var existingUser = existingTenant.ApplicationUsers.FirstOrDefault(a => a.UserId == command.UserId);
        if (existingUser is not null)
        {
            throw new BadRequestException($"User with id {command.UserId} already exists");
        }
        
        existingTenant.AddApplicationUser(command.UserId);
        await repository.SaveChangesAsync();
        
        return Unit.Value;
    }
}