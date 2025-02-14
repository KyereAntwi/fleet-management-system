namespace Odatey.FleetManagementSystem.Application.Tests.Features.Tenants;

public class CreateATenantCommandHandlerTests
{
    private readonly Mock<ITenantRepository> _mockTenantRepository = TenantMock.GetTenantRepositoryMock();

    private readonly Mock<IAsyncRepository<Workspace>> _mockWorkspaceRepository =
        WorkspaceMock.GetWorkspaceRepositoryMock();
}