import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/icons";
import {Box} from "@chakra-ui/react";
import FuelConsumptionExpenses from "./FuelConsumptionExpenses";
import MaintenanceExpenses from "./MaintenanceExpenses";
import AccidentRepairExpenses from "./AccidentRepairExpenses";
import HirePayments from "./HirePayments";
import {VehicleDetails} from "../../../models/vehicles/vehicle";

interface Props {
    data: BaseResponse<VehicleDetails>
}

const VehicleExpensesDetails = ({data}: Props) => {
    
    return (
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
    )
}

export default VehicleExpensesDetails;