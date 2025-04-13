import {useQuery} from "@tanstack/react-query";
import {
    getVehiclesDueForRoadworthyRenewalsPerWorkspaceAsync
} from "../../../services/vehicleServices";
import {Vehicle} from "../../../models/vehicles/vehicle";

export const useGetVehiclesDueForRoadworthyRenewalsPerWorkspace = (workspaceId: string, period?: string) => {
    return useQuery<BaseResponse<number>>({
        queryKey: ['vehiclesDueForRoadworthyRenewalsPerWorkspace', workspaceId, period],
        queryFn: async () => {
            const result = await getVehiclesDueForRoadworthyRenewalsPerWorkspaceAsync(workspaceId, period);
            return result as BaseResponse<number>;
        },
        enabled: !!workspaceId,
    })
}