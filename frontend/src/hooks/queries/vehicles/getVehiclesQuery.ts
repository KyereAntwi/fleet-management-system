import {GetVehiclesRequest} from "../../../models/vehicles/vehicleRequests";
import {useQuery} from "@tanstack/react-query";
import {PagedResponse} from "../../../models/PagedResponse";
import {Vehicle} from "../../../models/vehicles/vehicle";
import {getWorkspaceVehiclesAsync} from "../../../services/vehicleServices";

export const getVehiclesQuery = (request: GetVehiclesRequest) => {
    return useQuery<BaseResponse<PagedResponse<Vehicle>>>({
        queryKey: ['vehicles', request.keyword, request.page, request.pageSize],
        queryFn: async () => {
            const vehicles = await getWorkspaceVehiclesAsync(request);
            return vehicles as BaseResponse<PagedResponse<Vehicle>>;
        }
    })
}