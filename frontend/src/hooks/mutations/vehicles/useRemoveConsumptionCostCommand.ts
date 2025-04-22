import {useMutation} from "@tanstack/react-query";
import {VehicleExpenditureType} from "../../../models/vehicles/vehicleRequests";
import {removeConsumptionCostAsync} from "../../../services/vehicleServices";
import {useToast} from "@chakra-ui/react";
import {AxiosError} from "axios";
import {BaseResponse} from "../../../models/BaseResponse";

interface Props {
    workspaceId: string,
    vehicleId: string,
    expenditureId: string,
    expenditureType: VehicleExpenditureType,
}
export const useRemoveConsumptionCostCommand = () => {
    const toast = useToast();
    
    return useMutation({
        mutationFn: async (request: Props) => {
            return removeConsumptionCostAsync(request.workspaceId, request.vehicleId, request.expenditureId, request.expenditureType);
        },
        
        onSuccess: () => {
            toast({
                title: 'Success.',
                description: 'Operation was successful',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
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