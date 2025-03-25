import {
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody, Flex, FormControl, FormLabel, Input, InputGroup, Button
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {AddVehicleRequest} from "../../models/vehicles/vehicleRequests";
import {useEffect} from "react";
import {FormHelperText, InputLeftAddon} from "@chakra-ui/icons";
import {useAddVehicleCommand} from "../../hooks/mutations/vehicles/useAddVehicleCommand";
import {zodResolver} from "@hookform/resolvers/zod";
import {z, ZodType} from "zod";

interface  Props {
    isOpen: boolean;
    onClose: () => void;
    workspaceId: string;
}

const formSchema: ZodType<AddVehicleRequest> = z.object({
    workspaceId: z.string(),
    brandAndType: z.string(),
    initialCost: z.number().min(0.00, { message: 'Initial cost should not be less than 0.00' }),
    mileageCovered: z.string().min(3, { message: 'Mileage covered should not be less than 0.00' }),
    roadWorthyRenewalDate: z.string().date(),
    insuranceRenewalDate: z.string().date()
});

const AddVehicleForm = ({isOpen, onClose, workspaceId}: Props) => {
    const mutation = useAddVehicleCommand({onClose: onClose});
    const {register, handleSubmit, formState: {errors, isValid}, reset, setValue} = useForm<AddVehicleRequest>({ resolver: zodResolver(formSchema) });
    
    const onSubmit = handleSubmit(data => {
        mutation.mutateAsync(data);
        reset();
    });
    
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
                                    {errors?.brandAndType && <FormHelperText color={'red.500'}>{errors.brandAndType.message}</FormHelperText>}
                                </FormControl>

                                <FormControl my={4}>
                                    <FormLabel>Initial Cost</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>GHC</InputLeftAddon>
                                        <Input type={'number'} onChange={(e) => setValue('initialCost', Number(e.target.value))} placeholder={'Initial Cost'} required />
                                        {errors?.initialCost && <FormHelperText color={'red.500'}>{errors.initialCost.message}</FormHelperText>}
                                    </InputGroup>
                                </FormControl>

                                <FormControl my={4}>
                                    <FormLabel>Mileage covered on the vehicle</FormLabel>
                                    <Input  {...register('mileageCovered')} placeholder={'Mileage covered'} />
                                    {errors?.mileageCovered && <FormHelperText color={'red.500'}>{errors.mileageCovered.message}</FormHelperText>}
                                </FormControl>

                                <FormControl my={4}>
                                    <FormLabel>Road worthy renewal date</FormLabel>
                                    <Input type={'date'}  {...register('roadWorthyRenewalDate')} />
                                    {errors?.roadWorthyRenewalDate && <FormHelperText color={'red.500'}>{errors.roadWorthyRenewalDate.message}</FormHelperText>}
                                </FormControl>

                                <FormControl my={4}>
                                    <FormLabel>Insurance renewal date</FormLabel>
                                    <Input type={'date'}  {...register('insuranceRenewalDate')} />
                                    {errors?.insuranceRenewalDate && <FormHelperText color={'red.500'}>{errors.insuranceRenewalDate.message}</FormHelperText>}
                                </FormControl>
                                
                                <Button isDisabled={!isValid} isLoading={mutation.isPending} type="submit">Add Vehicle</Button>
                            </form>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AddVehicleForm;