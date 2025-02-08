namespace Odatey.FleetManagementSystem.Domain.Fleets;

public class Vehicle : BaseEntity<VehicleId>
{
    private readonly Collection<FuelConsumed> _fuelConsumed = [];
    public IReadOnlyCollection<FuelConsumed> FuelConsumptions => _fuelConsumed.AsReadOnly();
    
    private readonly Collection<MaintenanceCost> _maintenanceCosts = [];
    public IReadOnlyCollection<MaintenanceCost> MaintenanceCosts => _maintenanceCosts.AsReadOnly();
    
    private readonly Collection<AccidentRepairCost> _accidentRepairCosts = [];
    public IReadOnlyCollection<AccidentRepairCost> AccidentRepairCost => _accidentRepairCosts.AsReadOnly();
    
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

    public void Update(
        string brandAndType,
        double initialCost,
        string mileageCovered,
        DateTime roadworthyRenewalDate,
        DateTime insuranceRenewalDate)
    {
        BrandAndType = brandAndType;
        InitialCost = initialCost;
        MileageCovered = mileageCovered;
        RoadworthyRenewalDate = roadworthyRenewalDate;
        InsuranceRenewalDate = insuranceRenewalDate;
    }

    public void AddFuelConsumption(double fuelConsumptionCost)
    {
        if (fuelConsumptionCost <= 0)
        {
            throw new DomainExceptions("Fuel consumption can not be zero or negative.");
        }
        
        var newFuelConsumption = new FuelConsumed(Id, fuelConsumptionCost);
        _fuelConsumed.Add(newFuelConsumption);
    }

    public void AddMaintenanceCost(double maintenanceCost)
    {
        if (maintenanceCost <= 0)
        {
            throw new DomainExceptions("Maintenance cost can not be zero or negative.");
        }
        
        var newMaintenanceCost = new MaintenanceCost(Id, maintenanceCost);
        _maintenanceCosts.Add(newMaintenanceCost);
    }

    public void AddAccidentRepairCost(double accidentRepairCost)
    {
        if (accidentRepairCost <= 0)
        {
            throw new DomainExceptions("Accident repair cost can not be zero or negative.");
        }
        
        var newAccidentRepairCost = new AccidentRepairCost(Id, accidentRepairCost);
        _accidentRepairCosts.Add(newAccidentRepairCost);
    }
}