namespace Odatey.FleetManagementSystem.Application.Features.Tenants.Commands;

public record AddUserToTenantCommand(string UserId, string TenantId) : ICommand;

public class AddUserToTenantCommandHandler(ITenantRepository repository) 
    : ICommandHandler<AddUserToTenantCommand>
{
    public async Task<Unit> Handle(AddUserToTenantCommand command, CancellationToken cancellationToken)
    {
        var existingTenant = await repository.GetTenantAsync(command.UserId);
        if (existingTenant is null)
        {
            throw new NotFoundException($"Tenant with id {command.UserId} does not exist");
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