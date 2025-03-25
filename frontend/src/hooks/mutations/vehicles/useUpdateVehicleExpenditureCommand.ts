import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UpdateVehicleExpenditureRequest} from "../../../models/vehicles/vehicleRequests";
import {updateVehicleExpenditureAsync} from "../../../services/vehicleServices";
import {useToast} from "@chakra-ui/react";
import {AxiosError} from "axios";

interface Props {
    onClose: () => void;
    workspaceId: string;
    vehicleId: string;
}

export const useUpdateVehicleExpenditureCommand = (
    {
        onClose,
        workspaceId,
        vehicleId,
    }: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    
    return useMutation({
        mutationFn: async (data: UpdateVehicleExpenditureRequest) => {
            return await updateVehicleExpenditureAsync(workspaceId, data)
        },
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vehicle-details', vehicleId] });
            toast({
                title: 'Success.',
                description: "Expenditure added successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            onClose()
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