namespace Odatey.FleetManagementSystem.Domain.Fleets;

public class Vehicle : BaseEntity<VehicleId>
{
    private readonly Collection<FuelConsumed> _fuelConsumed = [];
    public IReadOnlyList<FuelConsumed> FuelConsumptions => _fuelConsumed;
    
    private readonly Collection<MaintenanceCost> _maintenanceCosts = [];
    public IReadOnlyList<MaintenanceCost> MaintenanceCosts => _maintenanceCosts;
    
    private readonly Collection<AccidentRepairCost> _accidentRepairCosts = [];
    public IReadOnlyList<AccidentRepairCost> AccidentRepairCosts => _accidentRepairCosts;

    private readonly Collection<HirePayment> _hirePayments = [];
    public IReadOnlyList<HirePayment> HirePayments => _hirePayments;
    
    private readonly Collection<Location> _locations = [];
    public IReadOnlyList<Location> Locations => _locations;
    
    public required WorkspaceId WorkspaceId { get; set; }
    public string? BrandAndType { get; set; }
    public double InitialCost { get; set; }
    public string? MileageCovered { get; set; }
    public decimal AnnualDepreciation { get; set; }
    public DateTime? RoadworthyRenewalDate { get; set; }
    public DateTime? InsuranceRenewalDate { get; set; }

    public static Vehicle Create(
        VehicleId vehicleId,
        WorkspaceId workspaceId,
        string brandAndType,
        double initialCost, 
        string mileageCovered,
        DateTime roadworthyRenewalDate,
        DateTime insuranceRenewalDate,
        decimal annualDepreciation = 0)
    {
        var vehicle = new Vehicle
        {
            Id = vehicleId,
            WorkspaceId = workspaceId,
            BrandAndType = brandAndType,
            InitialCost = initialCost,
            MileageCovered = mileageCovered,
            RoadworthyRenewalDate = roadworthyRenewalDate,
            InsuranceRenewalDate = insuranceRenewalDate,
            AnnualDepreciation = annualDepreciation
        };
        
        return vehicle;
    }

    public void Update(
        string brandAndType,
        double initialCost,
        string mileageCovered,
        DateTime roadworthyRenewalDate,
        DateTime insuranceRenewalDate,
        decimal annualDepreciation = 0)
    {
        BrandAndType = brandAndType;
        InitialCost = initialCost;
        MileageCovered = mileageCovered;
        RoadworthyRenewalDate = roadworthyRenewalDate;
        InsuranceRenewalDate = insuranceRenewalDate;
        AnnualDepreciation = annualDepreciation;
    }

    public void AddFuelConsumption(double fuelConsumptionCost, DateTime? createdAt)
    {
        if (fuelConsumptionCost <= 0)
        {
            throw new DomainExceptions("Fuel consumption can not be zero or negative.");
        }
        
        var newFuelConsumption = new FuelConsumed(Id, fuelConsumptionCost, createdAt!);
        _fuelConsumed.Add(newFuelConsumption);
    }

    public void AddMaintenanceCost(double maintenanceCost, DateTime? createdAt)
    {
        if (maintenanceCost <= 0)
        {
            throw new DomainExceptions("Maintenance cost can not be zero or negative.");
        }
        
        var newMaintenanceCost = new MaintenanceCost(Id, maintenanceCost, createdAt);
        _maintenanceCosts.Add(newMaintenanceCost);
    }

    public void AddAccidentRepairCost(double accidentRepairCost, DateTime? createdAt)
    {
        if (accidentRepairCost <= 0)
        {
            throw new DomainExceptions("Accident repair cost can not be zero or negative.");
        }
        
        var newAccidentRepairCost = new AccidentRepairCost(Id, accidentRepairCost, createdAt);
        _accidentRepairCosts.Add(newAccidentRepairCost);
    }

    public void AddHirePayment(double payment, DateTime? createdAt)
    {
        if (payment <= 0)
        {
            throw new DomainExceptions("Hire payment can not be zero or negative.");
        }
        
        var newHirePayment = new HirePayment(Id, payment, createdAt);
        _hirePayments.Add(newHirePayment);
    }

    public void AddLocation(decimal longitude, decimal latitude, DateTime? createdAt)
    {
        var location = new Location(Id, longitude, latitude, createdAt);
        _locations.Add(location);
    }
    
    public void RemoveHirePayment(Guid hirePaymentId)
    {
        var hirePayment = _hirePayments.First(hp => hp.Id == HirePaymentId.Of(hirePaymentId));
        _hirePayments.Remove(hirePayment);
    }

    public void RemoveFuelConsumption(Guid fuelConsumptionId)
    {
        var fuelConsumption = _fuelConsumed.First(fc => fc.Id == FuelConsumedId.Of(fuelConsumptionId));
        _fuelConsumed.Remove(fuelConsumption);
    }

    public void RemoveMaintenance(Guid maintenanceCostId)
    {
        var maintenanceCost = _maintenanceCosts.First(mc => mc.Id == MaintenanceCostId.Of(maintenanceCostId));
        _maintenanceCosts.Remove(maintenanceCost);
    }

    public void RemoveAccidentRepairCost(Guid accidentRepairCostId)
    {
        var accidentRepairCost = _accidentRepairCosts.First(ar => ar.Id == AccidentRepairCostId.Of(accidentRepairCostId));
        _accidentRepairCosts.Remove(accidentRepairCost);
    }
}