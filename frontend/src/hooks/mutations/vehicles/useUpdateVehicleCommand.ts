import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { UpdateVehicleRequest } from "../../../models/vehicles/vehicleRequests";
import { updateVehicleAsync } from "../../../services/vehicleServices";
import { AxiosError } from "axios";

interface Props {
    onClose: () => void;
    workspaceId: string;
    vehicleId: string;
}

export const useUpdateVehicleCommand = ({ onClose, workspaceId, vehicleId }: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: async (data: UpdateVehicleRequest) => {
            const response = await updateVehicleAsync(data);
            return response.data as BaseResponse<string>;
        },

        onSuccess: (response: BaseResponse<string>) => {
            queryClient.invalidateQueries({ queryKey: ['vehicle-details', vehicleId] });
            toast({
                title: 'Success.',
                description: "Vehicle updated successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            onClose();
        },

        onError: (error: AxiosError<BaseResponse<string>>) => {
            console.error(error);
            toast({
                title: 'Error.',
                description: error.response?.data?.errors[0] ?? error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    })
}