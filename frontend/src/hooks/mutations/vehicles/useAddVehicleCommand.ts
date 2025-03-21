import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addVehicleAsync} from "../../../services/vehicleServices";
import {AddVehicleRequest} from "../../../models/vehicles/vehicleRequests";
import {useToast} from "@chakra-ui/react";
import {AxiosError} from "axios";

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
            queryClient.invalidateQueries({ queryKey: ['vehicles', {workspaceId: response.data}] });
            toast.call({
                type: "success",
                message: `Vehicles added successfully.`,
            });
            onClose();
        },
        
        onError: (error: AxiosError<BaseResponse<string>>) => {
            toast.call({
                type: "error",
                message: `${error?.response?.data?.errors[0] ?? error.message}`,
            });
        }
    })
}