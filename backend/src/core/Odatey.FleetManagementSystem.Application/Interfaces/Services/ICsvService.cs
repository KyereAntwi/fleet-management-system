namespace Odatey.FleetManagementSystem.Application.Interfaces.Services;

public interface ICsvService
{
    IEnumerable<CvsImportResult> ImportVehicles(IFormFile csvFile);
}

public class CvsImportResult
{
    public int VehicleID { get; set; }
    public double VehicleCost { get; set; }
    public double AnnualDepreciation { get; set; }
    public int MileageCovered { get; set; }
    public double FuelConsumed { get; set; }
    public double MaintenanceCost { get; set; }
    public double AccidentRepairCost { get; set; }
    public DateTime RoadworthyRenewalDate { get; set; }
    public DateTime InsuranceRenewalDate { get; set; }
}