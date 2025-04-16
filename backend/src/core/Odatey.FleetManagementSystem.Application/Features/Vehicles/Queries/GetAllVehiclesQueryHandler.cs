namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Queries;

public record GetAllVehiclesQuery(
    Guid WorkspaceId,
    string Keyword,
    double InitialCostFrom,
    double InitialCostTo,
    decimal AnnualDepreciationFrom,
    decimal AnnualDepreciationTo,
    string MileageCovered,
    DateTime RoadworthyRenewalDateFrom,
    DateTime RoadworthyRenewalDateTo,
    DateTime InsuranceRenewalDateFrom,
    DateTime InsuranceRenewalDateTo,
    int Page,
    int PageSize) : IQuery<PagedResponse<GetAllVehicleQueryDto>>;

public class GetAllVehiclesQueryHandler(IVehicleRepository repository) 
    : IRequestHandler<GetAllVehiclesQuery, PagedResponse<GetAllVehicleQueryDto>>
{
    public async Task<PagedResponse<GetAllVehicleQueryDto>> Handle(GetAllVehiclesQuery query, CancellationToken cancellationToken)
    {
        var queryResult = await repository
            .GetPagedListAsync(
                query.WorkspaceId, 
                query.Keyword, 
                query.InitialCostFrom,
                query.InitialCostTo,
                query.AnnualDepreciationFrom,
                query.AnnualDepreciationTo,
                query.MileageCovered,
                query.RoadworthyRenewalDateFrom,
                query.RoadworthyRenewalDateTo,
                query.InsuranceRenewalDateFrom,
                query.InsuranceRenewalDateTo,
                query.Page, 
                query.PageSize);

        var list = queryResult
            .Item2
            .Select(r => new GetAllVehicleQueryDto(
                r.Id.Value,
                r.WorkspaceId.Value,
                r.BrandAndType ?? string.Empty,
                r.InitialCost,
                r.MileageCovered ?? string.Empty,
                r.RoadworthyRenewalDate ?? DateTime.MinValue,
                r.InsuranceRenewalDate ?? DateTime.MinValue,
                r.CreatedAt ?? DateTime.MinValue));

        return new PagedResponse<GetAllVehicleQueryDto>
        {
            Data = list,
            Count = queryResult.Item1,
            Page = query.Page,
            PageSize = query.PageSize
        };
    }
}

public record GetAllVehicleQueryDto(
    Guid VehicleId,
    Guid WorkspaceId,
    string BrandAndType,
    double InitialCost,
    string MileageCovered,
    DateTime RoadworthyRenewalDate,
    DateTime InsuranceRenewalDate,
    DateTime CreatedAt);