import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack, IconButton,
    Menu,
    MenuButton, MenuDivider, MenuItem, MenuList,
    Spacer, useDisclosure
} from "@chakra-ui/react";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HamburgerIcon
} from "@chakra-ui/icons";
import {useParams} from "react-router";
import {useGetVehicleDetails} from "../../../hooks/queries/vehicles/useGetVehicleDetails";
import FullPageLoading from "../../../components/UI/FullPageLoading";
import FuelConsumptionExpenses from "./FuelConsumptionExpenses";
import MaintenanceExpenses from "./MaintenanceExpenses";
import AccidentRepairExpenses from "./AccidentRepairExpenses";
import AddVehicleExpenseForm from "./AddVehicleExpenseForm";

const VehicleDetails = () => {
    const {vehicleId, workspaceId} = useParams();
    
    const {
        data,
        isLoading,
        error
    } = useGetVehicleDetails(vehicleId!, workspaceId!);
    const {isOpen, onClose, onOpen} = useDisclosure();
    
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
                                        <Heading color={'teal.500'} size='md'>{data?.data?.vehicle.brandAndType}</Heading>
                                        <Spacer />
                                        <Menu>
                                            <MenuButton as={IconButton} aria-label='Open operations' icon={<HamburgerIcon />} />
                                            <MenuList>
                                                <MenuItem onClick={onOpen}>Make an expense</MenuItem>
                                                <MenuDivider />
                                                <MenuItem color={'red'}>Delete this vehicle</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </HStack>
                                </CardHeader>
                                <CardBody>

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
                        </Accordion>
                    </GridItem>
                </Grid>
            </Flex>
            
            <AddVehicleExpenseForm workspaceId={workspaceId!} vehicleId={vehicleId!} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default VehicleDetails;