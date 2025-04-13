import {useQuery} from "@tanstack/react-query";
import {getTotalCostOfFuelConsumedAsync} from "../../../services/vehicleServices";

interface Props {
    workspaceId: string;
    fromDate: string;
    toDate: string;
}

export const useGetTotalCostOfFuelConsumed = ({workspaceId, fromDate, toDate}: Props) => {
    return useQuery<number>({
        queryKey: ['TotalCostOfFuelConsumed', workspaceId, fromDate, toDate],
        queryFn: async () => {
            const response = await getTotalCostOfFuelConsumedAsync(workspaceId, fromDate, toDate);
            return response.data as number;
        },
        enabled: !!workspaceId,
    })
}