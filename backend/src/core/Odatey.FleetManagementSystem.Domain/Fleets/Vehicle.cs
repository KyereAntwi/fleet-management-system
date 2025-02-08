namespace Odatey.FleetManagementSystem.Domain.Fleets;

public class Vehicle : BaseEntity<VehicleId>
{
    private readonly Collection<FuelConsumed> _fuelConsumed = [];
    public IReadOnlyCollection<FuelConsumed> FuelConsumptions => _fuelConsumed.AsReadOnly();
    
    private readonly Collection<MaintenanceCost> _maintenanceCost = [];
    public IReadOnlyCollection<MaintenanceCost> MaintenanceCosts => _maintenanceCost.AsReadOnly();
    
    private readonly Collection<AccidentRepairCost> _accidentRepairCost = [];
    public IReadOnlyCollection<AccidentRepairCost> AccidentRepairCost => _accidentRepairCost.AsReadOnly();
    
    public required VehicleId VehicleId { get; set; }
    public required WorkspaceId WorkspaceId { get; set; }
    public string? BrandAndType { get; set; }
    public double InitialCost { get; set; }
    public string? MileageCovered { get; set; }
    public DateTime? RoadworthyRenewalDate { get; set; }
    public DateTime? InsuranceRenewalDate { get; set; }

    public static Vehicle Create(
        VehicleId vehicleId,
        WorkspaceId workspaceId,
        string brandAndType,
        double initialCost, 
        string mileageCovered,
        DateTime roadworthyRenewalDate,
        DateTime insuranceRenewalDate)
    {
        var vehicle = new Vehicle
        {
            VehicleId = vehicleId,
            WorkspaceId = workspaceId,
            BrandAndType = brandAndType,
            InitialCost = initialCost,
            MileageCovered = mileageCovered,
            RoadworthyRenewalDate = roadworthyRenewalDate,
            InsuranceRenewalDate = insuranceRenewalDate
        };
        
        return vehicle;
    }
}