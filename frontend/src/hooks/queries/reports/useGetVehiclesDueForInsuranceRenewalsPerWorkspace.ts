import {useQuery} from "@tanstack/react-query";
import {getVehiclesDueForInsuranceRenewalsPerWorkspaceAsync} from "../../../services/vehicleServices";
import {Vehicle} from "../../../models/vehicles/vehicle";
import {BaseResponse} from "../../../models/BaseResponse";

interface Props {
    workspaceId: string;
    period?: string;
}
export const useGetVehiclesDueForInsuranceRenewalsPerWorkspace = (
    {workspaceId, period}: Props
) => {
    return useQuery<BaseResponse<number>>({
        queryKey: ['vehiclesDueForInsuranceRenewalsPerWorkspace', period, workspaceId],
        queryFn: async () => {
            const result = await getVehiclesDueForInsuranceRenewalsPerWorkspaceAsync(workspaceId, period);
            return result as BaseResponse<number>;
        },
        enabled: !!workspaceId,
    })
}