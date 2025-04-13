namespace Odatey.FleetManagementSystem.Application.Features.Reports.Queries;

public record GetVehiclesDueForInsuranceRenewalsQuery(
    Guid WorkspaceId,
    string Period) : IQuery<int>;
    
public class GetVehiclesDueForInsuranceRenewalsQueryHandler(IReportsRepository vehicleRepository) 
    : IQueryHandler<GetVehiclesDueForInsuranceRenewalsQuery, int>
{
    public async Task<int> Handle(GetVehiclesDueForInsuranceRenewalsQuery query, CancellationToken cancellationToken)
    {
        return await vehicleRepository.GetVehiclesDueForInsuranceRenewalAsync(query.WorkspaceId, query.Period);
    }
}