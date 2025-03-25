import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {FormHelperText, Select} from "@chakra-ui/icons";
import {UpdateVehicleExpenditureRequest, VehicleExpenditureType} from "../../../models/vehicles/vehicleRequests";
import {z, ZodType} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {useUpdateVehicleExpenditureCommand} from "../../../hooks/mutations/vehicles/useUpdateVehicleExpenditureCommand";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    vehicleId: string;
    workspaceId: string;
}

const formSchema: ZodType<UpdateVehicleExpenditureRequest> = z.object({
    vehicleId: z.string().uuid(),
    cost: z.number().min(1.00, { message: 'Cost should not be less than 1.00' }),
    expenditureType: z.nativeEnum(VehicleExpenditureType)
});

const AddVehicleExpenseForm = ({isOpen, onClose, vehicleId, workspaceId}: Props) => {

    const {register, handleSubmit, formState: {errors, isValid}, setValue, reset} = 
        useForm<UpdateVehicleExpenditureRequest>({ resolver: zodResolver(formSchema) });

    useEffect(() => {
        if (vehicleId) {
            setValue('vehicleId', vehicleId);
        }
    }, [vehicleId])
    
    const mutation = useUpdateVehicleExpenditureCommand({
        vehicleId: vehicleId,
        workspaceId: workspaceId,
        onClose: onClose
    });

    const onSubmit = handleSubmit(data => {
        mutation.mutateAsync(data)
        reset({
            cost: 0.00,
            expenditureType: VehicleExpenditureType.Maintenance
        })
    });
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={onSubmit}>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Expense value</FormLabel>
                            <Input 
                                type={'number'}
                                step={'0.01'}
                                autoFocus 
                                placeholder='Cost expense value'
                                defaultValue={0.00}
                                onChange={(e) => setValue('cost', parseFloat(e.target.value))}
                            />
                            {errors?.cost && <FormHelperText color={'red.500'}>{errors.cost.message}</FormHelperText>}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Expense type</FormLabel>
                            <Select {...register('expenditureType')}>
                                <option value={VehicleExpenditureType.FuelConsumption}>Fuel Consumption</option>
                                <option value={VehicleExpenditureType.AccidentRepair}>Accident Repair Cost</option>
                                <option value={VehicleExpenditureType.Maintenance}>Maintenance</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                            type="submit"
                            colorScheme='blue' mr={3} isDisabled={!isValid} isLoading={mutation.isPending}>
                            Save
                        </Button>
                        <Button onClick={onClose} isDisabled={mutation.isPending}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default AddVehicleExpenseForm;