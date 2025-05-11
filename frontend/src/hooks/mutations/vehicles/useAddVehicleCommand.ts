import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addVehicleAsync} from "../../../services/vehicleServices";
import {AddVehicleRequest} from "../../../models/vehicles/vehicleRequests";
import {useToast} from "@chakra-ui/react";
import {AxiosError} from "axios";
import {BaseResponse} from "../../../models/BaseResponse";

interface Props {
    onClose: () => void;
}

export const useAddVehicleCommand = ({onClose}: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    
    return useMutation({
        mutationFn: async (data: AddVehicleRequest) => {
            const response = await addVehicleAsync(data);
            return response.data as BaseResponse<string>;
        },
        
        onSuccess: (response: BaseResponse<string>) => {
            queryClient.invalidateQueries({ queryKey: ['vehicles', '', 1, 20] });
            toast({
                title: 'Success.',
                description: "Vehicle added successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            onClose();
        },
        
        onError: (error: AxiosError<BaseResponse<string>>) => {
            toast({
                title: 'Error.',
                description: error.response?.data.errors[0] ?? error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    })
}