namespace Odatey.FleetManagementSystem.Application.Tests.Features.Workspaces;

public class GetSingleWorkspaceQueryTests
{
    //private readonly Mock<IWorkspaceRepository> _mockRepo = WorkspaceMock.GetWorkspaceRepositoryMock();

    [Fact]
    public async Task Handle_ShouldReturnSingleWorkspace()
    {
        // //var handler = new GetSingleWorkspacesQueryHandler(_mockRepo.Object);
        //
        // var result = await handler.Handle(
        //     new GetSingleWorkspacesQuery(new Guid("11111111-1111-1111-1111-111111111111")), CancellationToken.None);

        // result.ShouldNotBeNull();
        // result.WorkspaceTitle.ShouldBe("Workspace 1");
    }

    [Fact]
    public async Task Handle_ShouldThrowNotFoundException_WhenWorkspaceDoesNotExist()
    {
        // var handler = new GetSingleWorkspacesQueryHandler(_mockRepo.Object);
        //
        // await Assert.ThrowsAsync<NotFoundException>(async () =>
        // {
        //     await handler.Handle(new GetSingleWorkspacesQuery(new Guid("33333333-3333-3333-3333-333333333333")), CancellationToken.None);
        // });
    }
}
