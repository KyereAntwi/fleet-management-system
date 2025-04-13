import {useQuery} from "@tanstack/react-query";
import {getTotalCostOfMaintenanceAsync} from "../../../services/vehicleServices";

interface Props {
    workspaceId: string;
    fromDate: string;
    toDate: string;
}

export const useTotalCostOfMaintenance = ({workspaceId, fromDate, toDate}: Props) => {
    return useQuery<number>({
        queryKey: ['TotalCostOfMaintenance', workspaceId, fromDate, toDate],
        queryFn: async () => {
            const response = await getTotalCostOfMaintenanceAsync(workspaceId, fromDate, toDate);
            return response.data as number;
        },
        enabled: !!workspaceId,
    })
}