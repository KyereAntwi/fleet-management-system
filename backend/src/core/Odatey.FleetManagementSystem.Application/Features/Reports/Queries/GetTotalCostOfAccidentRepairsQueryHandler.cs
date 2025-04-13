namespace Odatey.FleetManagementSystem.Application.Features.Reports.Queries;

public record GetTotalCostOfAccidentRepairsQuery(Guid WorkspaceId, DateTime FromDate, DateTime ToDate) 
    : IQuery<double>;

public class GetTotalCostOfAccidentRepairsQueryHandler(IReportsRepository reportsRepository) 
    : IQueryHandler<GetTotalCostOfAccidentRepairsQuery, double>
{
    public async Task<double> Handle(GetTotalCostOfAccidentRepairsQuery request, CancellationToken cancellationToken)
    {
        return await reportsRepository.GetTotalCostOfAccidentRepairsAsync(request.WorkspaceId, request.FromDate, request.ToDate);
    }
}