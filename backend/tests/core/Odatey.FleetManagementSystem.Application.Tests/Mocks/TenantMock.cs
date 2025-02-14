namespace Odatey.FleetManagementSystem.Application.Tests.Mocks;

public static class TenantMock
{
    public static Mock<ITenantRepository> GetTenantRepositoryMock()
    {
        var tenants = new List<Tenant>
        {
            new()
            {
                Id = TenantId.of(new Guid("11111111-1111-1111-1111-111111111111")),
                ConnectionString = "",
                UserId = "Tenant1",
                Subscription = Subscription.Free
            },
            new()
            {
                Id = TenantId.of(new Guid("22222222-1111-1111-1111-111111111111")),
                ConnectionString = "",
                UserId = "Tenant2",
                Subscription = Subscription.Standard
            }
        };
        
        var mockTenantRepository = new Mock<ITenantRepository>();
        
        mockTenantRepository.Setup(repo => repo.GetTenantAsync(It.IsAny<string>())).ReturnsAsync(
            (string userId) => tenants.FirstOrDefault(t => t.UserId == userId));
        
        mockTenantRepository.Setup(repo => repo.GetConnectionStringAsync(It.IsAny<string>()))!.ReturnsAsync(
            (string userId) => tenants.FirstOrDefault(t => t.UserId == userId)?.ConnectionString);
        
        mockTenantRepository.Setup(repo => repo.CreateAsync(It.IsAny<Tenant>())).ReturnsAsync(
            (Tenant tenant) =>
            {
                tenants.Add(tenant);
                return tenant;
            });
        
        return mockTenantRepository;
    }
}