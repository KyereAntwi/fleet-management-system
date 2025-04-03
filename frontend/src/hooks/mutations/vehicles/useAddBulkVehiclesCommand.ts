import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@chakra-ui/react";
import {UploadVehicleRequest} from "../../../models/vehicles/vehicleRequests";
import {addBulkVehicleAsync} from "../../../services/vehicleServices";

interface Props {
    onClose: () => void;
}

export const useAddBulkVehiclesCommand = ({onClose}: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    
    return useMutation({
        mutationFn: async (data: UploadVehicleRequest) => {
            return await addBulkVehicleAsync(data.workspaceId, data.file);
        },
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
            toast({
                title: 'Success.',
                description: "Vehicles added successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            onClose();
        },
        
        onError: (error: Error) => {
            toast({
                title: 'Error.',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    })
}