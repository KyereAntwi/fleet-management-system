import {useQuery} from "@tanstack/react-query";
import {getTotalCostOfAccidentRepairsAsync} from "../../../services/vehicleServices";
import {BaseResponse} from "../../../models/BaseResponse";

interface Props {
    workspaceId: string;
    fromDate: string;
    toDate: string;
}

export const useGetTotalCostOfAccidentRepair = ({workspaceId, fromDate, toDate}: Props) => {
    return useQuery<BaseResponse<number>>({
        queryKey: ['TotalCostOfAccidentRepair', workspaceId, fromDate, toDate],
        queryFn: async () => {
            const response = await getTotalCostOfAccidentRepairsAsync(workspaceId, fromDate, toDate);
            return response.data as BaseResponse<number>;
        },
        enabled: !!workspaceId,
    })
}