namespace Odatey.FleetManagementSystem.Application.Tests.Features.Vehicles;

public class AddVehicleToWorkspaceCommandHandlerTests
{
    private readonly Mock<IVehicleRepository> _mockRepo = RepositoryMocks.GetVehicleRepositoryMock();
    private readonly Mock<IAsyncRepository<Workspace>> _mockWorkspaceRepo = RepositoryMocks.GetWorkspaceRepositoryMock();

    [Fact]
    public async Task Handle_ShouldAddVehicleToWorkspace()
    {
        var handler = new AddVehicleToWorkspaceCommandHandler(_mockRepo.Object, _mockWorkspaceRepo.Object);
        
        var result = await handler.Handle(new AddVehicleToWorkspaceCommand(
            new Guid("11111111-1111-1111-1111-111111111111"),
            "Toyota",
            55.99,
            "100km",
            DateTime.Today.AddDays(7),
            DateTime.Today.AddDays(28)), CancellationToken.None);

        result.ShouldNotBeNull();
    }
    
    [Fact]
    public async Task Handle_ShouldThrowException_WhenRepositoryThrowsException()
    {
        _mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Vehicle>())).ThrowsAsync(new Exception("Repository error"));
        
        var handler = new AddVehicleToWorkspaceCommandHandler(_mockRepo.Object, _mockWorkspaceRepo.Object);

        await Assert.ThrowsAsync<Exception>(async () =>
        {
            await handler.Handle(new AddVehicleToWorkspaceCommand(
                new Guid("11111111-1111-1111-1111-111111111111"),
                "Toyota",
                55.99,
                "100km",
                DateTime.Today.AddDays(7),
                DateTime.Today.AddDays(28)), CancellationToken.None);
        });
    }
    
    [Fact]
    public async Task Handle_ShouldThrowNotFoundException_WhenWorkspaceDoesNotExist()
    {
        var handler = new AddVehicleToWorkspaceCommandHandler(_mockRepo.Object, _mockWorkspaceRepo.Object);

        await Assert.ThrowsAsync<NotFoundException>(async () =>
        {
            await handler.Handle(new AddVehicleToWorkspaceCommand(
                new Guid("33333333-1111-1111-1111-111111111111"),
                "Toyota",
                55.99,
                "100km",
                DateTime.Today.AddDays(7),
                DateTime.Today.AddDays(28)), CancellationToken.None);
        });
    }
}