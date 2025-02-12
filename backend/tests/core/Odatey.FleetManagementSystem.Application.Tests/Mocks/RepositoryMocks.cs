namespace Odatey.FleetManagementSystem.Application.Tests.Mocks;

public static class RepositoryMocks
{
    public static Mock<IAsyncRepository<Workspace>> GetWorkspaceRepositoryMock()
    {
        var workspaces = new List<Workspace>
        {
            new()
            {
                Id = WorkspaceId.Of(new Guid("11111111-1111-1111-1111-111111111111")), 
                WorkspaceTitle = "Workspace 1", 
                CreatedAt = DateTime.Now, 
                UpdatedAt = DateTime.Now, 
                CreatedBy = "User1", 
                UpdatedBy = "User1"
            },
            new()
            {
                Id = WorkspaceId.Of(new Guid("22222222-2222-2222-2222-222222222222")), 
                WorkspaceTitle = "Workspace 2", 
                CreatedAt = DateTime.Now, 
                UpdatedAt = DateTime.Now, 
                CreatedBy = "User2", 
                UpdatedBy = "User2"
            }
        };
        
        var mockWorkspaceRepository = new Mock<IAsyncRepository<Workspace>>();
        mockWorkspaceRepository.Setup(repo => repo.ListAllAsync(CancellationToken.None)).ReturnsAsync(workspaces);
        
        mockWorkspaceRepository.Setup(repo => repo.AddAsync(It.IsAny<Workspace>(), CancellationToken.None)).ReturnsAsync(
            (Workspace workspace) =>
            {
                workspaces.Add(workspace);
                return workspace;
            });
        
        return mockWorkspaceRepository;
    }
}