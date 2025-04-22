import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AddVehicleRequest } from "../../models/vehicles/vehicleRequests";
import { useEffect } from "react";
import { FormHelperText, InputLeftAddon } from "@chakra-ui/icons";
import { useAddVehicleCommand } from "../../hooks/mutations/vehicles/useAddVehicleCommand";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { Vehicle } from "../../models/vehicles/vehicle";
import { useUpdateVehicleCommand } from "../../hooks/mutations/vehicles/useUpdateVehicleCommand";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
  vehicle?: Vehicle;
}

const formSchema: ZodType<AddVehicleRequest> = z.object({
  workspaceId: z.string(),
  brandAndType: z
    .string()
    .min(2, { message: "Brand and type should not be less than 2 characters" }),
  initialCost: z
    .number()
    .min(0.0, { message: "Initial cost should not be less than 0.00" }),
  mileageCovered: z
    .string()
    .min(3, { message: "Mileage covered should not be less than 0.00" }),
  roadWorthyRenewalDate: z
    .string()
    .refine(
      (date) =>
        new Date(date).toISOString().slice(0, 16) >
        new Date().toISOString().slice(0, 16),
      { message: "Road worthy renewal date must be in the future" }
    ),
  insuranceRenewalDate: z
    .string()
    .refine(
      (date) =>
        new Date(date).toISOString().slice(0, 16) >
        new Date().toISOString().slice(0, 16),
      { message: "Insurance renewal date must be in the future" }
    ),
});

const AddVehicleForm = ({ isOpen, onClose, workspaceId, vehicle }: Props) => {
  const addMutation = useAddVehicleCommand({ onClose: onClose });
  const updateMutation = useUpdateVehicleCommand({
    onClose: onClose,
    workspaceId: workspaceId,
    vehicleId: vehicle?.vehicleId!,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<AddVehicleRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceId: vehicle?.workspaceId ?? "",
      brandAndType: vehicle?.brandAndType ?? "",
      initialCost: vehicle?.initialCost ?? 0,
      mileageCovered: vehicle?.mileageCovered ?? "",
      roadWorthyRenewalDate: new Date(
        vehicle?.roadworthyRenewalDate ?? Date.now()
      )
        .toISOString()
        .slice(0, 16),
      insuranceRenewalDate: new Date(
        vehicle?.insuranceRenewalDate ?? Date.now()
      )
        .toISOString()
        .slice(0, 16),
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (vehicle) {
      updateMutation
        .mutateAsync({
          ...data,
          vehicleId: vehicle.vehicleId,
        })
        .then(() => reset());
    } else {
      addMutation.mutateAsync(data).then(() => reset());
    }
  });

  useEffect(() => {
    if (workspaceId) {
      setValue("workspaceId", workspaceId);
    }
  }, [workspaceId]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          {!addMutation.isPending || !updateMutation.isPending ? (
            <DrawerCloseButton />
          ) : null}
          <DrawerHeader>
            {vehicle ? "Edit Selected Vehicle" : "Add a vehicle to your fleets"}
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDirection={"column"} w={"full"}>
              <form onSubmit={onSubmit}>
                <FormControl my={4}>
                  <FormLabel>Vehicle brand and type</FormLabel>
                  <Input
                    {...register("brandAndType")}
                    placeholder={"Brand and Type"}
                  />
                  {errors?.brandAndType && (
                    <FormHelperText color={"red.500"}>
                      {errors.brandAndType.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl my={4}>
                  <FormLabel>Initial Cost</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>GHC</InputLeftAddon>
                    <Input
                      type={"number"}
                      placeholder={"Initial Cost"}
                      required
                      {...register("initialCost", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors?.initialCost && (
                      <FormHelperText color={"red.500"}>
                        {errors.initialCost.message}
                      </FormHelperText>
                    )}
                  </InputGroup>
                </FormControl>

                <FormControl my={4}>
                  <FormLabel>Mileage covered on the vehicle</FormLabel>
                  <Input
                    {...register("mileageCovered")}
                    placeholder={"Mileage covered"}
                  />
                  {errors?.mileageCovered && (
                    <FormHelperText color={"red.500"}>
                      {errors.mileageCovered.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl my={4}>
                  <FormLabel>Road worthy renewal date</FormLabel>
                  <Input
                    type={"datetime-local"}
                    {...register("roadWorthyRenewalDate")}
                  />
                  {errors?.roadWorthyRenewalDate && (
                    <FormHelperText color={"red.500"}>
                      {errors.roadWorthyRenewalDate.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl my={4}>
                  <FormLabel>Insurance renewal date</FormLabel>
                  <Input
                    type={"datetime-local"}
                    {...register("insuranceRenewalDate")}
                  />
                  {errors?.insuranceRenewalDate && (
                    <FormHelperText color={"red.500"}>
                      {errors.insuranceRenewalDate.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <Button
                  isDisabled={!isValid}
                  isLoading={addMutation.isPending || updateMutation.isPending}
                  type="submit"
                >
                  {vehicle ? "Update Vehicle" : "Add Vehicle"}
                </Button>
              </form>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddVehicleForm;
