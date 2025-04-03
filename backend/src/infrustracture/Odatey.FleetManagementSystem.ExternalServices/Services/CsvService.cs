using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Http;

namespace Odatey.FleetManagementSystem.ExternalServices.Services;

public class CsvService : ICsvService
{
    private readonly CsvConfiguration _csvConfiguration;
    public CsvService()
    {
        _csvConfiguration = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            PrepareHeaderForMatch = args => args.Header.ToLower()
        };
    }
    
    public IEnumerable<CvsImportResult> ImportVehicles(IFormFile csvFile)
    {
        using var reader = new StreamReader(csvFile.OpenReadStream());
        using var csv = new CsvReader(reader, _csvConfiguration);
        var records = csv.GetRecords<CvsImportResult>().ToArray();
        return records;
    }
}