import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UpdateWorkspaceRequest} from "../../../models/workspaces/workspaceRequests";
import {updateWorkspaceAsync} from "../../../services/workspaceServices";
import {useToast} from "@chakra-ui/react";

interface Props {
    workspaceId: string;
    onSuccess: () => void;
}

export const useUpdateWorkspaceCommand = ({workspaceId, onSuccess}: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    
    return useMutation({
        mutationFn: async (data: UpdateWorkspaceRequest) => {
            return await updateWorkspaceAsync(data);
        },
        
        onMutate: () => {
            toast({
                title: 'Information',
                description: 'Workspace is updating ...',
                status: 'info',
                duration: 9000,
                isClosable: true,
            });
        },
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getWorkspace', workspaceId] });
            toast({
                title: 'Success.',
                description: "Workspace updated successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            
            onSuccess();
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