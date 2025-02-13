namespace Odatey.FleetManagementSystem.Application.Tests.Features.Vehicles;

public class AddAccidentRepairCostToVehicleCommandHandlerTests
{
    private readonly Mock<IAsyncRepository<Vehicle>> _vehicleRepositoryMock = RepositoryMocks.GetVehicleRepositoryMock();

    [Fact]
    public async Task Handle_ShouldAddAccidentRepairCostToVehicle_WithValidParameters()
    {
        var handler = new AddAccidentRepairCostToVehicleCommandHandler(_vehicleRepositoryMock.Object);

        var result = await handler.Handle(
            new AddAccidentRepairCostToVehicleCommand(
                new Guid("11111111-1111-1111-1111-111111111111"),
                1600), CancellationToken.None);
        
        result.ShouldBe(Unit.Value);
    }
    
    [Fact]
    public async Task Handle_ShouldThrowNotFoundException_WhenVehicleDoesNotExist()
    {
        var handler = new AddAccidentRepairCostToVehicleCommandHandler(_vehicleRepositoryMock.Object);

        await Assert.ThrowsAsync<NotFoundException>(async () =>
        {
            await handler.Handle(new AddAccidentRepairCostToVehicleCommand(
                Guid.NewGuid(), 
                55.6), CancellationToken.None);
        });
    }
    
    [Fact]
    public async Task Handle_ShouldThrowDomainExceptions_WithUnValidParameters()
    {
        var handler = new AddAccidentRepairCostToVehicleCommandHandler(_vehicleRepositoryMock.Object);

        await Assert.ThrowsAsync<DomainExceptions>(async () =>
        {
            await handler.Handle(new AddAccidentRepairCostToVehicleCommand(
                new Guid("11111111-1111-1111-1111-111111111111"), 
                -98.98), CancellationToken.None);
        });
    }
}