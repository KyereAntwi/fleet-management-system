namespace Odatey.FleetManagementSystem.Application.Tests.Features.Vehicles;

public class GetAllVehiclesQueryHandlerTests
{
    private readonly Mock<IVehicleRepository> _mockVehicleRepo = RepositoryMocks.GetVehicleRepositoryMock();

    [Fact]
    public async Task Handle_ShouldReturnAllVehicles()
    {
        var handler = new GetAllVehiclesQueryHandler(_mockVehicleRepo.Object);
        
        var result = await handler.Handle(
            new GetAllVehiclesQuery(
                new Guid("11111111-1111-1111-1111-111111111111"),
                string.Empty,
                1,
                20),
            CancellationToken.None);

        result.ShouldNotBeNull();
        result.Data.Count().ShouldBe(1);
        result.Data.First().WorkspaceId.ShouldBe(Guid.Parse("11111111-1111-1111-1111-111111111111"));
    }

    [Fact]
    public async Task Handle_ShouldReturnEmptyCollection_WhenWorkspaceDoesNotExist()
    {
        var handler = new GetAllVehiclesQueryHandler(_mockVehicleRepo.Object);
        
        var result = await handler.Handle(
            new GetAllVehiclesQuery(
                new Guid("22222222-1111-1111-1111-111111111111"),
                string.Empty,
                1,
                20),
            CancellationToken.None);
        
        result.ShouldNotBeNull();
        result.Data.Count().ShouldBe(0);
    }
}