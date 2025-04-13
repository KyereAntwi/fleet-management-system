import {useQuery} from "@tanstack/react-query";
import {getTotalCostOfFleetsAsync, getTotalNumberOfFleetsAsync} from "../../../services/vehicleServices";

interface Props {
    workspaceId: string;
    fromDate: string;
    toDate: string;
}

export const useGetTotalCostOfFleets = ({workspaceId, fromDate, toDate}: Props) => {
    return useQuery<BaseResponse<number>>({
        queryKey: ['TotalCostOfFleets', workspaceId, fromDate, toDate],
        queryFn: async () => {
            const response = await getTotalCostOfFleetsAsync(workspaceId, fromDate, toDate);
            return response.data as BaseResponse<number>;
        },
        enabled: !!workspaceId,
    })
}

export const useGetTotalNumberOfFleets = ({workspaceId, fromDate, toDate}: Props) => {
    return useQuery<number>({
        queryKey: ['TotalNumberOfFleets', workspaceId, fromDate, toDate],
        queryFn: async () => {
            const response = await getTotalNumberOfFleetsAsync(workspaceId, fromDate, toDate);
            return response.data as number;
        },
        enabled: !!workspaceId,
    })
}