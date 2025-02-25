namespace Odatey.FleetManagementSystem.Application.Features.Vehicles.Queries;

public record GetAVehicleDetailsQuery(GetAVehicleDetailsQueryRequest VehicleId) : IQuery<VehicleDetailsQueryDto>;

public class GetAVehicleDetailsQueryHandler(IVehicleRepository repository) 
    : IQueryHandler<GetAVehicleDetailsQuery, VehicleDetailsQueryDto>
{
    public async Task<VehicleDetailsQueryDto> Handle(GetAVehicleDetailsQuery query, CancellationToken cancellationToken)
    {
        var exitingVehicle = await repository.GetVehicleWithDetailsAsync(query.VehicleId.Id);

        if (exitingVehicle is null)
        {
            throw new NotFoundException($"Vehicle with id {query.VehicleId} does not exist.");
        }
        
        return exitingVehicle.ToVehicleDetailsQueryDto() ;
    }
}

public record GetAVehicleDetailsQueryRequest (Guid Id);