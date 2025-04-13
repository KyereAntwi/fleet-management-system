namespace Odatey.FleetManagementSystem.Application.Features.Reports.Queries;

public record GetTotalCostOfFleetsPerWorkspaceQuery(
    Guid WorkspaceId,
    DateTime FromDate,
    DateTime ToDate
    ) : IQuery<double>;

public class GetTotalCostOfFleetsPerWorkspaceQueryHandler(IReportsRepository vehicleRepository) 
    : IQueryHandler<GetTotalCostOfFleetsPerWorkspaceQuery, double>
{
    public async Task<double> Handle(GetTotalCostOfFleetsPerWorkspaceQuery query, CancellationToken cancellationToken)
    {
        return await vehicleRepository.GetTotalCostOfFleetsPerWorkspaceAsync(query.WorkspaceId, query.FromDate, query.ToDate);
    }
}