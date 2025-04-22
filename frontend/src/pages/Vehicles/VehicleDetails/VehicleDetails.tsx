import {
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
    Spacer, Tab, Table, TableContainer, Tbody, Td, Text, Tr, useDisclosure
} from "@chakra-ui/react";
import {
    HamburgerIcon, TabList, TabPanel, TabPanels, Tabs, Tag
} from "@chakra-ui/icons";
import {Outlet, useNavigate, useParams} from "react-router";
import {useGetVehicleDetails} from "../../../hooks/queries/vehicles/useGetVehicleDetails";
import FullPageLoading from "../../../components/UI/FullPageLoading";
import AddVehicleExpenseForm from "./AddVehicleExpenseForm";
import {useDeleteVehicleCommand} from "../../../hooks/mutations/vehicles/useDeleteVehicleCommand";
import Swal from 'sweetalert2';
import AddVehicleForm from "../AddVehicleForm";
import VehicleExpensesDetails from "./VehicleExpensesDetails";

const VehicleDetails = () => {
    const {vehicleId, workspaceId} = useParams();
    const navigation = useNavigate();
    
    const {
        data,
        isLoading,
        error
    } = useGetVehicleDetails(vehicleId!, workspaceId!);
    
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {isOpen: isOpenEdit, onClose: onCloseEdit, onOpen: onOpenEdit} = useDisclosure();
    
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
                                                <MenuItem onClick={onOpenEdit}>Edit vehicle details</MenuItem>
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
                        <Tabs>
                            <TabList>
                                <Tab>Vehicle Details</Tab>
                                <Tab onClick={() => navigation('reports')}>Reports and Key Metrics</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <VehicleExpensesDetails data={data!} />
                                </TabPanel>
                                <TabPanel>
                                    <Outlet />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </GridItem>
                </Grid>
            </Flex>
            
            <AddVehicleExpenseForm workspaceId={workspaceId!} vehicleId={vehicleId!} isOpen={isOpen} onClose={onClose} />
            <AddVehicleForm isOpen={isOpenEdit} onClose={onCloseEdit} workspaceId={workspaceId!} vehicle={
                data?.data?.vehicle!
            } />
        </>
    )
}

export default VehicleDetails;