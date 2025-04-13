namespace Odatey.FleetManagementSystem.Application.Features.Reports.Queries;

public record GetTotalMaintenanceCostQuery(Guid WorkspaceId, DateTime FromDate, DateTime ToDate) 
    : IQuery<double>;

public class GetTotalMaintenanceCostQueryHandler(IReportsRepository reportsRepository) 
    : IQueryHandler<GetTotalMaintenanceCostQuery, double>
{
    public async Task<double> Handle(GetTotalMaintenanceCostQuery query, CancellationToken cancellationToken)
    {
        return await reportsRepository.GetTotalCostOfMaintenanceAsync(query.WorkspaceId, query.FromDate, query.ToDate);
    }
}