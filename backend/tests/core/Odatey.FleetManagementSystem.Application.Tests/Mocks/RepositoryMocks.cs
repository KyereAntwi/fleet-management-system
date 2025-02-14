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

        mockWorkspaceRepository.Setup(repo => repo.ListAllAsync()).ReturnsAsync(workspaces);

        mockWorkspaceRepository.Setup(repo => repo.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync(
            (Guid id) => workspaces.FirstOrDefault(x => x.Id.Value == id));

        mockWorkspaceRepository.Setup(repo => repo.AddAsync(It.IsAny<Workspace>())).ReturnsAsync(
            (Workspace workspace) =>
            {
                workspaces.Add(workspace);
                return workspace;
            });

        return mockWorkspaceRepository;
    }

    public static Mock<IVehicleRepository> GetVehicleRepositoryMock()
    {
        var vehicles = new List<Vehicle>
        {
            new()
            {
                VehicleId = VehicleId.Of(new Guid("11111111-1111-1111-1111-111111111111")),
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
            (Guid id) => vehicles.FirstOrDefault(x => x.VehicleId.Value == id));
        
        mockVehicleRepository.Setup(repo => repo.GetVehicleWithDetailsAsync(It.IsAny<Guid>()))!
            .ReturnsAsync((Guid id) => vehicles.FirstOrDefault(x => x.VehicleId.Value == id));

        mockVehicleRepository.Setup(repo => repo
                .GetPagedListAsync(It.IsAny<Guid>(), It.IsAny<string>(), It.IsAny<int>(), It.IsAny<int>()))
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