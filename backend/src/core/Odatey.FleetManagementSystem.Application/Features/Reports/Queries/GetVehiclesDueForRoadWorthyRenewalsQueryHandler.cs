namespace Odatey.FleetManagementSystem.Application.Features.Reports.Queries;

public record GetVehiclesDueForRoadWorthyRenewalsQuery(Guid WorkspaceId) : IQuery<IEnumerable<GetAllVehicleQueryDto>>;

public class GetVehiclesDueForRoadWorthyRenewalsQueryHandler(IVehicleRepository vehicleRepository) 
    : IQueryHandler<GetVehiclesDueForRoadWorthyRenewalsQuery, IEnumerable<GetAllVehicleQueryDto>>
{
    public async Task<IEnumerable<GetAllVehicleQueryDto>> Handle(GetVehiclesDueForRoadWorthyRenewalsQuery query, CancellationToken cancellationToken)
    {
        var queryResult = await vehicleRepository.GetVehiclesDueForRoadworthyRenewalAsync(query.WorkspaceId);
        
        var list = queryResult.Select(v => new GetAllVehicleQueryDto(
            v.Id.Value,
            v.WorkspaceId.Value,
            v.BrandAndType ?? string.Empty,
            v.InitialCost,
            v.MileageCovered ?? string.Empty,
            v.RoadworthyRenewalDate ?? DateTime.MinValue,
            v.InsuranceRenewalDate ?? DateTime.MinValue,
            v.CreatedAt ?? DateTime.MinValue));

        return list;
    }
}