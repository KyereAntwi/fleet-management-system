namespace Odatey.FleetManagementSystem.Application.Tests.Features.Vehicles;

public class UpdateVehicleCommandHandlerTests
{
    private readonly Mock<IAsyncRepository<Vehicle>> _mockRepo = RepositoryMocks.GetVehicleRepositoryMock();

    [Fact]
    public async Task Handle_ShouldThrowNotFoundException_WhenVehicleDoesNotExist()
    {
        var handler = new UpdateVehicleCommandHandler(_mockRepo.Object);

        await Assert.ThrowsAsync<NotFoundException>(async () =>
        {
            await handler.Handle(new UpdateVehicleCommand(
                Guid.NewGuid(), 
                "Brand and type",
                34.33,
                "Mileage",
                DateTime.Now.AddHours(-1),
                DateTime.Now.AddHours(1)
            ), CancellationToken.None);
        });
    }

    [Fact]
    public async Task Handle_ShouldUpdateVehicle()
    {
        var handler = new UpdateVehicleCommandHandler(_mockRepo.Object);
        
        var result = await handler.Handle(new UpdateVehicleCommand(
            new Guid("11111111-1111-1111-1111-111111111111"),
            "Brand and type",
            34.33,
            "Mileage",
            DateTime.Now.AddHours(-1),
            DateTime.Now.AddHours(1)), CancellationToken.None);
        
        result.ShouldBe(Unit.Value);
    }
}