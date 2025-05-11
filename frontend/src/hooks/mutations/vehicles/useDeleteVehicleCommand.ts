import {useMutation} from "@tanstack/react-query";
import {deleteVehicleAsync} from "../../../services/vehicleServices";
import {AxiosError} from "axios";
import {useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router";
import {BaseResponse} from "../../../models/BaseResponse";

interface Props {
    vehicleId: string;
    workspaceId: string;
}
export const useDeleteVehicleCommand = ({vehicleId, workspaceId}: Props) => {
    const toast = useToast();
    const navigation = useNavigate();
    
    return useMutation({
        mutationFn: async () => {
            return deleteVehicleAsync(workspaceId, vehicleId)
        },
        
        onSuccess: () => {
            navigation(`/workspaces/${workspaceId}/management/vehicles`)
        },
        
        onError: (error: AxiosError<BaseResponse<string>>) => {
            toast({
                title: 'Error.',
                description: error.response?.data.errors[0] ?? error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    })
}