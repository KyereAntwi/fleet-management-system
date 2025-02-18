using Microsoft.AspNetCore.Http;

namespace Odatey.FleetManagementSystem.ExternalServices.Services;

public class CsvService : ICsvService
{
    public IEnumerable<CvsImportResult> ImportVehicles(IFormFile csvFile)
    {
        throw new NotImplementedException();
    }
}