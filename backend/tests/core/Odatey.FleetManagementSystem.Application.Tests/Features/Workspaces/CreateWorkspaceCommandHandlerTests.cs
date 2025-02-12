namespace Odatey.FleetManagementSystem.Application.Tests.Features.Workspaces;

public class CreateWorkspaceCommandHandlerTests
{
    private readonly Mock<IAsyncRepository<Workspace>> _mockRepo = RepositoryMocks.GetWorkspaceRepositoryMock();

    [Fact]
    public async Task Handle_ShouldCreateWorkspace()
    {
        var handler = new CreateWorkspaceCommandHandler(_mockRepo.Object);

        var result = await handler.Handle(new CreateWorkspaceCommand("Workspace 3"), CancellationToken.None);

        result.ShouldNotBeNull();
    }

    [Fact]
    public async Task Handle_ShouldThrowException_WhenRepositoryThrowsException()
    {
        _mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Workspace>())).ThrowsAsync(new Exception("Repository error"));
        var handler = new CreateWorkspaceCommandHandler(_mockRepo.Object);

        await Assert.ThrowsAsync<Exception>(async () =>
        {
            await handler.Handle(new CreateWorkspaceCommand("Workspace 4"), CancellationToken.None);
        });
    }

}
