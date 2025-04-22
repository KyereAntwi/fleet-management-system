namespace Odatey.FleetManagementSystem.Application.Tests.Mocks;

public static class VehicleMock
{
    public static Mock<IVehicleRepository> GetVehicleRepositoryMock()
    {
        var vehicles = new List<Vehicle>
        {
            new()
            {
                Id = VehicleId.Of(new Guid("11111111-1111-1111-1111-111111111111")),
                WorkspaceId = WorkspaceId.Of(new Guid("11111111-1111-1111-1111-111111111111")),
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                CreatedBy = "User1",
                UpdatedBy = "User1",
                BrandAndType = "Brand and Type",
                InitialCost = 55.99,
                MileageCovered = "Mileage Covered",
                RoadworthyRenewalDate = DateTime.Today.AddDays(7),
                InsuranceRenewalDate = DateTime.Today.AddDays(28)
            }
        };

        var mockVehicleRepository = new Mock<IVehicleRepository>();

        mockVehicleRepository.Setup(repo => repo.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync(
            (Guid id) => vehicles.FirstOrDefault(x => x.Id.Value == id));
        
        mockVehicleRepository.Setup(repo => repo.GetVehicleWithDetailsAsync(It.IsAny<Guid>()))!
            .ReturnsAsync((Guid id) => vehicles.FirstOrDefault(x => x.Id.Value == id));

        mockVehicleRepository.Setup(repo => repo
                .GetPagedListAsync(
                    It.IsAny<Guid>(), 
                    It.IsAny<string>(), 
                    It.IsAny<double>(),
                    It.IsAny<double>(),
                    It.IsAny<decimal>(),
                    It.IsAny<decimal>(),
                    It.IsAny<string>(),
                    It.IsAny<DateTime>(),
                    It.IsAny<DateTime>(),
                    It.IsAny<DateTime>(),
                    It.IsAny<DateTime>(),
                    It.IsAny<int>(), 
                    It.IsAny<int>()))
            .ReturnsAsync(
                (Guid workspaceId, string searchTerm, int page, int pageSize) =>
                {
                    var list = vehicles
                        .Where(v => v.WorkspaceId.Value == workspaceId)
                        .ToList();

                    if (!string.IsNullOrWhiteSpace(searchTerm))
                        list = [.. vehicles.Where(v => v.BrandAndType!.Contains(searchTerm))];

                    return (list.Count, list.Skip((page - 1) * pageSize).Take(pageSize).ToList());
                });

        mockVehicleRepository.Setup(repo => repo.AddAsync(It.IsAny<Vehicle>())).ReturnsAsync(
            (Vehicle vehicle) =>
            {
                vehicles.Add(vehicle);
                return vehicle;
            });

        return mockVehicleRepository;
    }
}