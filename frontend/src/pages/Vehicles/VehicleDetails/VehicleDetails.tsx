import {
    Box,
    Card,
    CardBody,
    CardHeader, Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack, IconButton,
    Menu,
    MenuButton, MenuDivider, MenuItem, MenuList,
    Spacer, Table, TableContainer, Tbody, Td, Text, Tr, useDisclosure
} from "@chakra-ui/react";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HamburgerIcon, Tag
} from "@chakra-ui/icons";
import {useParams} from "react-router";
import {useGetVehicleDetails} from "../../../hooks/queries/vehicles/useGetVehicleDetails";
import FullPageLoading from "../../../components/UI/FullPageLoading";
import FuelConsumptionExpenses from "./FuelConsumptionExpenses";
import MaintenanceExpenses from "./MaintenanceExpenses";
import AccidentRepairExpenses from "./AccidentRepairExpenses";
import AddVehicleExpenseForm from "./AddVehicleExpenseForm";
import {useDeleteVehicleCommand} from "../../../hooks/mutations/vehicles/useDeleteVehicleCommand";
import Swal from 'sweetalert2';
import HirePayments from "./HirePayments";

const VehicleDetails = () => {
    const {vehicleId, workspaceId} = useParams();
    
    const {
        data,
        isLoading,
        error
    } = useGetVehicleDetails(vehicleId!, workspaceId!);
    const {isOpen, onClose, onOpen} = useDisclosure();
    
    const deleteMutation = useDeleteVehicleCommand({
        vehicleId: vehicleId!,
        workspaceId: workspaceId!,
    })
    const handleDelete = async () => {
        if (data && (
            data?.data?.accidentRepairCosts?.length! > 0 || 
            data?.data?.maintenanceCosts?.length! > 0 || 
            data?.data?.fuelConsumed?.length! > 0)) {
            Swal.fire({
                icon: 'warning',
                title: 'This vehicle contains related data. Do you still want to proceed?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {
                    doDelete()
                } else if (result.isDenied) {
                    return;
                }
            });
        } else {
            doDelete()
        }
    }
    
    const doDelete = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to delete this vehicle and related data completely?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                return deleteMutation.mutateAsync()
            } else if (result.isDenied) {
                return;
            }
        });
    }
    
    if (isLoading) {
        return (
            <FullPageLoading />
        )
    }
    
    if (error) {
        console.error("Error getting vehicle details", error);
    }
    
    return (
        <>
            <Flex
                w={{
                    sm: 'full',
                    md:  '80%'
                }}
                mx='auto'
                pt={4}
            >
                <Grid templateColumns='repeat(5, 1fr)' gap={4} w={'full'}>
                    <GridItem colSpan={2}>
                        {data && (
                            <Card w={'full'}>
                                <CardHeader>
                                    <HStack>
                                        {!data?.data?.vehicle?.brandAndType && (
                                            <Tag size={'sm'} variant='solid' p={2}>
                                                Brand and Type not set
                                            </Tag>
                                        )}
                                        <Heading color={'teal.500'} size='md'>{data?.data?.vehicle.brandAndType || data?.data?.vehicle?.vehicleId}</Heading>
                                        <Spacer />
                                        <Menu>
                                            <MenuButton as={IconButton} aria-label='Open operations' icon={<HamburgerIcon />} />
                                            <MenuList>
                                                <MenuItem onClick={onOpen}>Make an expense</MenuItem>
                                                <MenuDivider />
                                                <MenuItem color={'red'} onClick={handleDelete}>Delete this vehicle</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </HStack>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    <TableContainer>
                                        <Table size={'sm'}>
                                            <Tbody>
                                                <Tr>
                                                    <Td>
                                                        <Text fontWeight={'bold'}>Created At:</Text>
                                                    </Td>
                                                    <Td>{new Date(data?.data?.vehicle?.createdAt!).toLocaleDateString()}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>
                                                        <Text fontWeight={'bold'}>Initial Cost:</Text>
                                                    </Td>
                                                    <Td>GHC {data?.data?.vehicle?.initialCost!}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>
                                                        <Text fontWeight={'bold'}>Insurance Renewal Date:</Text>
                                                    </Td>
                                                    <Td>{new Date(data?.data?.vehicle?.insuranceRenewalDate!).toLocaleDateString()}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>
                                                        <Text fontWeight={'bold'}>Mileage Covered:</Text>
                                                    </Td>
                                                    <Td>{data?.data?.vehicle?.mileageCovered!}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>
                                                        <Text fontWeight={'bold'}>Road Worthy Renewal Date:</Text>
                                                    </Td>
                                                    <Td>{new Date(data?.data?.vehicle?.roadworthyRenewalDate!).toLocaleDateString()}</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </CardBody>
                            </Card>
                        )}
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Accordion defaultIndex={[0]} allowMultiple w={'full'}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as='span' flex='1' textAlign='left' fontWeight={'bold'}>
                                            Fuel Consumption Expenses
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <FuelConsumptionExpenses expenses={data?.data?.fuelConsumed!} />
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as='span' flex='1' textAlign='left' fontWeight={'bold'}>
                                            Maintenance Expenses
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <MaintenanceExpenses expenses={data?.data?.maintenanceCosts!} />
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as='span' flex='1' textAlign='left' fontWeight={'bold'}>
                                            Accident Repair Expenses
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <AccidentRepairExpenses expenses={data?.data?.accidentRepairCosts!} />
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as='span' flex='1' textAlign='left' fontWeight={'bold'}>
                                            Hire Payments Received
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <HirePayments expenses={data?.data?.hirePayments!} />
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </GridItem>
                </Grid>
            </Flex>
            
            <AddVehicleExpenseForm workspaceId={workspaceId!} vehicleId={vehicleId!} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default VehicleDetails;