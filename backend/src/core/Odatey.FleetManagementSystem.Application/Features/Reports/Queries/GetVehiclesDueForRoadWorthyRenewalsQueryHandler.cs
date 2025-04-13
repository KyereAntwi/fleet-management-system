namespace Odatey.FleetManagementSystem.Application.Features.Reports.Queries;

public record GetVehiclesDueForRoadWorthyRenewalsQuery(Guid WorkspaceId, string Period) : IQuery<int>;

public class GetVehiclesDueForRoadWorthyRenewalsQueryHandler(IReportsRepository vehicleRepository) 
    : IQueryHandler<GetVehiclesDueForRoadWorthyRenewalsQuery, int>
{
    public async Task<int> Handle(GetVehiclesDueForRoadWorthyRenewalsQuery query, CancellationToken cancellationToken)
    {
        return await vehicleRepository.GetVehiclesDueForRoadworthyRenewalAsync(query.WorkspaceId, query.Period);
    }
}