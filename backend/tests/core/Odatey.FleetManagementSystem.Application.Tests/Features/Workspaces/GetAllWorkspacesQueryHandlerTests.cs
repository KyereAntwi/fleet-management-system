namespace Odatey.FleetManagementSystem.Application.Tests.Features.Workspaces;

public class GetAllWorkspacesQueryHandlerTests
{
    private readonly Mock<IAsyncRepository<Workspace>> _mockRepo = RepositoryMocks.GetWorkspaceRepositoryMock();

    [Fact]
    public async Task Handle_ShouldReturnAllWorkspaces()
    {
        var handler = new GetAllWorkspacesQueryHandler(_mockRepo.Object);

        var result = await handler.Handle(new GetAllWorkspacesQuery(), CancellationToken.None);

        result.ShouldNotBeNull();
        result.Count().ShouldBe(2);
        result.First().WorkspaceTitle.ShouldBe("Workspace 1");
        result.Last().WorkspaceTitle.ShouldBe("Workspace 2");
    }
}