namespace Odatey.FleetManagementSystem.Application.Features.Reports.Queries;

public record GetTotalNumberOfVehiclesQuery(Guid WorkspaceId, DateTime FromDate, DateTime ToDate) : IQuery<int>;

public class GetTotalNumberOfVehiclesQueryHandler(IReportsRepository reportsRepository) 
    : IQueryHandler<GetTotalNumberOfVehiclesQuery, int>
{
    public async Task<int> Handle(GetTotalNumberOfVehiclesQuery query, CancellationToken cancellationToken)
    {
        return await reportsRepository.TotalNumberOfVehiclesAsync(query.WorkspaceId, query.FromDate, query.ToDate);
    }
}