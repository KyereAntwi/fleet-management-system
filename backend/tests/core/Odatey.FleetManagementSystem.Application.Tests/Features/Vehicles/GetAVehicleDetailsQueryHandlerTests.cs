namespace Odatey.FleetManagementSystem.Application.Tests.Features.Vehicles;

public class GetAVehicleDetailsQueryHandlerTests
{
    private readonly Mock<IVehicleRepository> _mockVehicleRepo = RepositoryMocks.GetVehicleRepositoryMock();

    [Fact]
    public async Task Handle_ShouldReturnVehicle()
    {
        var handler = new GetAVehicleDetailsQueryHandler(_mockVehicleRepo.Object);

        var result = await handler.Handle(new GetAVehicleDetailsQuery(new Guid("11111111-1111-1111-1111-111111111111")),
            CancellationToken.None);

        result.ShouldNotBeNull();
        result.ShouldBeOfType<VehicleDetailsQueryDto>();
        result.FuelConsumed.Count().ShouldBe(0);
        result.MaintenanceCosts.Count().ShouldBe(0);
        result.AccidentRepairCosts.Count().ShouldBe(0);
    }

    [Fact]
    public async Task Handle_ShouldThrowNotFoundException_WhenVehicleNotFound()
    {
        var handler = new GetAVehicleDetailsQueryHandler(_mockVehicleRepo.Object);
        await Assert.ThrowsAsync<NotFoundException>(async () =>
        {
            await handler.Handle(new GetAVehicleDetailsQuery(Guid.NewGuid()), CancellationToken.None);
        });
    }
}