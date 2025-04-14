import {
    Box, Card, CardBody,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Input, Spacer, Spinner, StatLabel, Text
} from "@chakra-ui/react";
import {useParams} from "react-router";
import VehiclesDueForRoadworthyRenewalReportWidget from "./VehiclesDueForRoadworthyRenewalReportWidget";
import VehicleDueForInsuranceRenewalReportWidget from "./VehicleDueForInsuranceRenewalReportWidget";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Stat,
    StatNumber
} from "@chakra-ui/icons";
import TotalCostOfFleetsReportWidget from "./TotalCostOfFleetsReportWidget";
import {useState} from "react";
import TotalCostOfAccidentRepairsReportWidget from "./TotalCostOfAccidentRepairsReportWidget";
import {useGetTotalNumberOfFleets} from "../../../hooks/queries/reports/useGetTotalCostOfFleets";
import TotalCostOfFuelConsumedReportWidget from "./TotalCostOfFuelConsumedReportWidget";
import TotalCostOfMaintenanceReportWidget from "./TotalCostOfMaintenanceReportWidget";

const WorkspaceDashboard = () => {
    const {workspaceId} = useParams();
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    
    const {data: totalFleets, isLoading} = useGetTotalNumberOfFleets({
        workspaceId: workspaceId!,
        fromDate: '',
        toDate: ''
    });
    
  return (
      <Flex flexDirection="column" w={'full'} as={'section'}>
        <Flex 
            w={{
            md: '80%',
            sm: 'full'
          }}
            mx={'auto'}
            as={'section'}
        >
            <Accordion defaultIndex={[0]} allowMultiple w={'full'}>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left' fontWeight={'bold'}>
                                Vehicles Due for Roadworthy and Insurance Renewal
                            </Box>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Grid templateColumns={{
                            sm: 'repeat(1, 1fr)',
                            md: 'repeat(4, 1fr)',
                        }} gap={4} w={'full'}>
                            <GridItem h={'full'}>
                                <VehiclesDueForRoadworthyRenewalReportWidget workspaceId={workspaceId!} period={'current'}/>
                            </GridItem>
                            <GridItem h={'full'}>
                                <VehiclesDueForRoadworthyRenewalReportWidget workspaceId={workspaceId!} period={'past'} />
                            </GridItem>
                            <GridItem h={'250px'}>
                                <VehicleDueForInsuranceRenewalReportWidget workspaceId={workspaceId!} period={'current'} />
                            </GridItem>
                            <GridItem h={'250px'}>
                                <VehicleDueForInsuranceRenewalReportWidget workspaceId={workspaceId!} period={'past'} />
                            </GridItem>
                        </Grid>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left' fontWeight={'bold'}>
                                Total Cost of Expenditure on Workspace
                            </Box>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <>
                            <Card mb={2}>
                                <CardBody>
                                    <Text>Filter stats by date range: </Text>
                                    <HStack>
                                        <FormControl w={300}>
                                            <FormLabel>From Date:</FormLabel>
                                            <Input type={'date'} w={300} onChange={(e) => setFromDate(e.target.value)} />
                                        </FormControl>

                                        <FormControl w={300}>
                                            <FormLabel>To Date:</FormLabel>
                                            <Input type={'date'} w={300} onChange={(e) => setToDate(e.target.value)} />
                                        </FormControl>
                                        
                                        <Spacer />

                                        {isLoading ? (<Spinner />) : (
                                            <Stat>
                                                <StatLabel>TOTAL FLEETS</StatLabel>
                                                <StatNumber fontSize={'5xl'}>{totalFleets!}</StatNumber>
                                            </Stat>
                                        )}
                                    </HStack>
                                </CardBody>
                            </Card>
                            
                            <Grid templateColumns={{
                                sm: 'repeat(1, 1fr)',
                                md: 'repeat(4, 1fr)',
                            }} gap={4} w={'full'}>
                                <GridItem h={'full'}>
                                    <TotalCostOfFleetsReportWidget workspaceId={workspaceId!} fromDate={fromDate} toDate={toDate} />
                                </GridItem>
                                <GridItem h={'full'}>
                                    <TotalCostOfAccidentRepairsReportWidget workspaceId={workspaceId!} fromDate={fromDate} toDate={toDate} />
                                </GridItem>
                                <GridItem h={'full'}>
                                    <TotalCostOfFuelConsumedReportWidget workspaceId={workspaceId!} fromDate={fromDate} toDate={toDate} />
                                </GridItem>
                                <GridItem h={'full'}>
                                    <TotalCostOfMaintenanceReportWidget workspaceId={workspaceId!} fromDate={fromDate} toDate={toDate} />
                                </GridItem>
                            </Grid>
                        </>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
      </Flex>
  );
};

export default WorkspaceDashboard;
