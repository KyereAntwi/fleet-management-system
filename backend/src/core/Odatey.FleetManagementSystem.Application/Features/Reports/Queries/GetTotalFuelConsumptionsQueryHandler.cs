namespace Odatey.FleetManagementSystem.Application.Features.Reports.Queries;

public record GetTotalFuelConsumptionsQuery(Guid WorkspaceId, DateTime FromDate, DateTime ToDate) 
    : IQuery<double>;

public class GetTotalFuelConsumptionsQueryHandler(IReportsRepository reportsRepository) 
    : IQueryHandler<GetTotalFuelConsumptionsQuery, double>
{
    public async Task<double> Handle(GetTotalFuelConsumptionsQuery query, CancellationToken cancellationToken)
    {
        return await reportsRepository.GetTotalCostOfFuelConsumptionAsync(query.WorkspaceId, query.FromDate, query.ToDate);
    }
}