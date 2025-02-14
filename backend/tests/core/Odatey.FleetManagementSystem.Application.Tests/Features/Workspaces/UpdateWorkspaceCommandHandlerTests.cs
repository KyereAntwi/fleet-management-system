namespace Odatey.FleetManagementSystem.Application.Tests.Features.Workspaces;

public class UpdateWorkspaceCommandHandlerTests
{
    private readonly Mock<IAsyncRepository<Workspace>> _mockRepo = WorkspaceMock.GetWorkspaceRepositoryMock();

    [Fact]
    public async Task Handle_ShouldThrowNotFoundException_WhenWorkspaceDoesNotExist()
    {
        _mockRepo.Setup(repo => repo.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Workspace)null);
        var handler = new UpdateWorkspaceCommandHandler(_mockRepo.Object);

        await Assert.ThrowsAsync<NotFoundException>(async () =>
        {
            await handler.Handle(new UpdateWorkspaceCommand(new Guid("33333333-3333-3333-3333-333333333333"), "Workspace 4"), CancellationToken.None);
        });
    }

    [Fact]
    public async Task Handle_ShouldUpdateWorkspace()
    {
        var workspace = Workspace.Create(WorkspaceId.Of(new Guid("22222222-2222-2222-2222-222222222222")), "Workspace 2");
        _mockRepo.Setup(repo => repo.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync(workspace);
        var handler = new UpdateWorkspaceCommandHandler(_mockRepo.Object);

        var result = await handler.Handle(new UpdateWorkspaceCommand(new Guid("22222222-2222-2222-2222-222222222222"), "Workspace 3"), CancellationToken.None);

        result.ShouldBe(Unit.Value);
    }
}
