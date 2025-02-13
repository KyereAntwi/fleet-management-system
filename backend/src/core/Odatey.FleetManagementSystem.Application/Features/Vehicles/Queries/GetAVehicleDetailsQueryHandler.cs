namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Queries;

public record GetAVehicleDetailsQuery(Guid VehicleId) : IQuery<VehicleDetailsQueryDto>;

public class GetAVehicleDetailsQueryHandler(IVehicleRepository repository) 
    : IQueryHandler<GetAVehicleDetailsQuery, VehicleDetailsQueryDto>
{
    public async Task<VehicleDetailsQueryDto> Handle(GetAVehicleDetailsQuery query, CancellationToken cancellationToken)
    {
        var exitingVehicle = await repository.GetVehicleWithDetailsAsync(query.VehicleId);

        if (exitingVehicle is null)
        {
            throw new NotFoundException($"Vehicle with id {query.VehicleId} does not exist.");
        }
        
        return exitingVehicle.ToVehicleDetailsQueryDto() ;
    }
}

public record VehicleDetailsQueryDto(
    VehicleDetailsDto Vehicle, 
    IEnumerable<FuelConsumedDto> FuelConsumed,
    IEnumerable<MaintenanceCostDto> MaintenanceCosts,
    IEnumerable<AccidentRepairCostDto> AccidentRepairCosts);

public record VehicleDetailsDto(
    Guid VehicleId,
    Guid WorkspaceId,
    string BrandAndType,
    double InitialCost,
    string MileageCovered,
    DateTime? RoadworthyRenewalDate,
    DateTime? InsuranceRenewalDate,
    DateTime? CreatedAt,
    DateTime? UpdatedAt,
    string? CreatedBy,
    string? UpdatedBy);
    
public record FuelConsumedDto(double FuelConsumedValue, DateTime? CreatedAt);
public record MaintenanceCostDto (double Cost, DateTime? CreatedAt);
public record AccidentRepairCostDto (double Cost, DateTime? CreatedAt);