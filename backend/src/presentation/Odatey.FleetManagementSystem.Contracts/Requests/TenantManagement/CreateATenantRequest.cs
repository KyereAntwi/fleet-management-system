namespace Odatey.FleetManagementSystem.Contracts.Requests.TenantManagement;

public record CreateATenantRequest(
    string UserId,
    string Subscription);