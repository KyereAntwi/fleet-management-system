import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UpdateTenantSubscription} from "../../../models/tenants/tenantRequests";
import {upgradeTenantAsync} from "../../../services/tenantsServices";
import {useToast} from "@chakra-ui/react";
import {AxiosError} from "axios";
import {useNavigate} from "react-router";

export const useUpgradeTenantSubscription = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const navigation = useNavigate();
    
    return useMutation({
        mutationFn: async (data: UpdateTenantSubscription) => {
            return await upgradeTenantAsync(data);
        },
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tenant'] });
            
            toast({
                title: 'Success.',
                description: "Tenant upgraded successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            
            navigation('/workspaces')
        },
        
        onError: (error: AxiosError) => {
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