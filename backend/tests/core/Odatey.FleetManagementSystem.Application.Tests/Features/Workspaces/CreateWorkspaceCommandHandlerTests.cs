namespace Odatey.FleetManagementSystem.Application.Tests.Features.Workspaces;

public class CreateWorkspaceCommandHandlerTests
{
    private readonly Mock<IAsyncRepository<Workspace>> _mockRepo = WorkspaceMock.GetWorkspaceRepositoryMock();
    private readonly Mock<ITenantRepository> _mockTenantRepo = TenantMock.GetTenantRepositoryMock();
    private readonly Mock<IAuthenticatedUser> _authenticatedUser = new Mock<IAuthenticatedUser>();

    [Fact]
    public async Task Handle_ShouldThrowBadRequestException_WhenTenantHasFreeSubscription()
    {
        var handler = new CreateWorkspaceCommandHandler(_mockRepo.Object, _mockTenantRepo.Object, _authenticatedUser.Object);
        await Assert.ThrowsAsync<BadRequestException>(async () =>
        {
            await handler.Handle(new CreateWorkspaceCommand("Workspace 4"), CancellationToken.None);
        });
    }
    
    [Fact]
    public async Task Handle_ShouldThrowNotFoundException_WhenTenantIsNotFound()
    {
        var handler = new CreateWorkspaceCommandHandler(_mockRepo.Object, _mockTenantRepo.Object, _authenticatedUser.Object);

        await Assert.ThrowsAsync<NotFoundException>(async () =>
        {
            await handler.Handle(new CreateWorkspaceCommand("Workspace 4"), CancellationToken.None);
        });
    }

    [Fact]
    public async Task Handle_ShouldCreateNewWorkspace_WhenHasPayingSubscription()
    {
        var handler = new CreateWorkspaceCommandHandler(_mockRepo.Object, _mockTenantRepo.Object, _authenticatedUser.Object);
        
        var result = await handler.Handle(new CreateWorkspaceCommand("Workspace 3"), CancellationToken.None);

        result.ShouldNotBeNull();
        result.ShouldBeOfType<CreateWorkspaceResponse>();
    }

    [Fact]
    public async Task Handle_ShouldThrowException_WhenRepositoryThrowsException()
    {
        _mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Workspace>())).ThrowsAsync(new Exception("Repository error"));
        var handler = new CreateWorkspaceCommandHandler(_mockRepo.Object, _mockTenantRepo.Object, _authenticatedUser.Object);

        await Assert.ThrowsAsync<Exception>(async () =>
        {
            await handler.Handle(new CreateWorkspaceCommand("Workspace 4"), CancellationToken.None);
        });
    }

}
