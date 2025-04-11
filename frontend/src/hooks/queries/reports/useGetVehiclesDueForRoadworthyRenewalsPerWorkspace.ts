import {useQuery} from "@tanstack/react-query";
import {getVehiclesDueForRoadworthyRenewalsPerWorkspace} from "../../../services/vehicleServices";
import {Vehicle} from "../../../models/vehicles/vehicle";

export const useGetVehiclesDueForRoadworthyRenewalsPerWorkspace = (workspaceId: string) => {
    return useQuery<BaseResponse<Vehicle[]>>({
        queryKey: ['vehiclesDueForRoadworthyRenewalsPerWorkspace', workspaceId],
        queryFn: async () => {
            const result = await getVehiclesDueForRoadworthyRenewalsPerWorkspace(workspaceId);
            return result as BaseResponse<Vehicle[]>;
        },
        enabled: !!workspaceId,
    })
}