namespace Odatey.FleetManagementSystem.Application.Tests.Features.Vehicles;

public class AddMaintenanceCostToVehicleCommandHandlerTests
{
    private readonly Mock<IVehicleRepository> _vehicleRepositoryMock = VehicleMock.GetVehicleRepositoryMock();

    [Fact]
    public async Task Handle_ShouldAddMaintenanceCostToVehicle_WithValidParameters()
    {
        var handler = new AddMaintenanceCostToVehicleCommandHandler(_vehicleRepositoryMock.Object);

        var result = await handler.Handle(
            new AddMaintenanceCostToVehicleCommand(
                new Guid("11111111-1111-1111-1111-111111111111"),
                1600), CancellationToken.None);
        
        result.ShouldBe(Unit.Value);
    }
    
    [Fact]
    public async Task Handle_ShouldThrowNotFoundException_WhenVehicleDoesNotExist()
    {
        var handler = new AddMaintenanceCostToVehicleCommandHandler(_vehicleRepositoryMock.Object);

        await Assert.ThrowsAsync<NotFoundException>(async () =>
        {
            await handler.Handle(new AddMaintenanceCostToVehicleCommand(
                Guid.NewGuid(), 
                55.6), CancellationToken.None);
        });
    }
    
    [Fact]
    public async Task Handle_ShouldThrowDomainExceptions_WithUnValidParameters()
    {
        var handler = new AddMaintenanceCostToVehicleCommandHandler(_vehicleRepositoryMock.Object);

        await Assert.ThrowsAsync<DomainExceptions>(async () =>
        {
            await handler.Handle(new AddMaintenanceCostToVehicleCommand(
                new Guid("11111111-1111-1111-1111-111111111111"), 
                -98.98), CancellationToken.None);
        });
    }
}