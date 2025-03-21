import {
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody, Flex, FormControl, FormLabel, Input, InputGroup, Button
} from "@chakra-ui/react";
import {Resolver, useForm} from "react-hook-form";
import {AddVehicleRequest} from "../../models/vehicles/vehicleRequests";
import {useEffect} from "react";
import {InputLeftAddon} from "@chakra-ui/icons";
import {useAddVehicleCommand} from "../../hooks/mutations/vehicles/useAddVehicleCommand";

interface  Props {
    isOpen: boolean;
    onClose: () => void;
    workspaceId: string;
}

const resolver: Resolver<AddVehicleRequest> = async (values) => {
    return {
        values: values,
        errors: {
            workspaceId: {
                type: 'required',
                message: 'This is required'
            },
            brandAndType: { type: 'string' },
            initialCost: { type: 'number' },
            mileageCovered: { type: 'string' },
            roadWorthyRenewalDate: { type: 'string' },
            insuranceRenewalDate: { type: 'string' },
        }
    }
}

const AddVehicleForm = ({isOpen, onClose, workspaceId}: Props) => {
    const mutation = useAddVehicleCommand({onClose: onClose});
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<AddVehicleRequest>({ resolver });
    
    const onSubmit = handleSubmit(data => mutation.mutateAsync(data));
    
    useEffect(() => {
        if (workspaceId) {
            setValue('workspaceId', workspaceId);
        }
    }, [workspaceId])
    
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={'md'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Add a vehicle to your fleets</DrawerHeader>
                    <DrawerBody>
                        <Flex flexDirection={'column'} w={'full'}>
                            <form onSubmit={onSubmit}>
                                <FormControl my={4}>
                                    <FormLabel>Vehicle brand and type</FormLabel>
                                    <Input  {...register('brandAndType')} placeholder={'Brand and Type'} />
                                    {errors?.brandAndType && <p>{errors.brandAndType.message}</p>}
                                </FormControl>

                                <FormControl my={4}>
                                    <FormLabel>Initial Cost</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>GHC</InputLeftAddon>
                                        <Input type={'number'}  {...register('initialCost')} placeholder={'Initial Cost'} required />
                                        {errors?.initialCost && <p>{errors.initialCost.message}</p>}
                                    </InputGroup>
                                </FormControl>

                                <FormControl my={4}>
                                    <FormLabel>Mileage covered on the vehicle</FormLabel>
                                    <Input  {...register('mileageCovered')} placeholder={'Mileage covered'} required />
                                </FormControl>

                                <FormControl my={4}>
                                    <FormLabel>Road worthy renewal date</FormLabel>
                                    <Input type={'date'}  {...register('roadWorthyRenewalDate')} required />
                                </FormControl>

                                <FormControl my={4}>
                                    <FormLabel>Insurance renewal date</FormLabel>
                                    <Input type={'date'}  {...register('insuranceRenewalDate')} required />
                                </FormControl>
                                
                                <Button isLoading={mutation.isPending} type="submit">Add Vehicle</Button>
                            </form>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AddVehicleForm;