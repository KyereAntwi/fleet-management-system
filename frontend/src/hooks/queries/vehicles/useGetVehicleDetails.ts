import {useQuery} from "@tanstack/react-query";
import {VehicleDetails} from "../../../models/vehicles/vehicle";
import {getVehicleDetailsAsync} from "../../../services/vehicleServices";
import {BaseResponse} from "../../../models/BaseResponse";

export const useGetVehicleDetails = (vehicleId: string, workspaceId: string) => {
    return useQuery<BaseResponse<VehicleDetails>, Error>({
        queryKey: ['vehicle-details', vehicleId],
        queryFn: async () => {
            const response = await getVehicleDetailsAsync(vehicleId, workspaceId);
            return response as BaseResponse<VehicleDetails>;
        }
    })
}