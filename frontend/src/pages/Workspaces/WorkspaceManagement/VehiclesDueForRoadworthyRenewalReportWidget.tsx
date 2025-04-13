import {
    Card, CardBody,
    CardHeader,
    Divider, HStack, Spacer,
    Spinner, StatArrow, StatHelpText, StatLabel,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tr
} from "@chakra-ui/react";
import {
    useGetVehiclesDueForRoadworthyRenewalsPerWorkspace
} from "../../../hooks/queries/reports/useGetVehiclesDueForRoadworthyRenewalsPerWorkspace";
import {Vehicle} from "../../../models/vehicles/vehicle";
import {Stat, StatNumber} from "@chakra-ui/icons";

interface Props {
    workspaceId: string;
    period?: string;
}

const DisplayStats = ({period, value} : {period: string, value: number}) => {
    return (
        <>
            {period === 'current' ? (
                <Stat>
                    <StatLabel>DUE ROADWORTHY RENEWAL</StatLabel>
                    <StatNumber fontSize={'6xl'}>{value}</StatNumber>
                    <StatHelpText>
                        <StatArrow type='increase' />
                    </StatHelpText>
                </Stat>
            ) : (
                <Stat>
                    <StatLabel>PAST ROADWORTHY RENEWAL</StatLabel>
                    <StatNumber fontSize={'6xl'}>{value}</StatNumber>
                    <StatHelpText>
                        <StatArrow type='decrease' />
                    </StatHelpText>
                </Stat>
            )}
        </>
    )
}

const VehiclesDueForRoadworthyRenewalReportWidget = ({workspaceId, period}: Props) => {
    const {data, isLoading, error} = useGetVehiclesDueForRoadworthyRenewalsPerWorkspace(workspaceId, period);
    
    if (error) {
        console.log(error);
        throw error;
    }
    
    return (
        <>
            <Card 
                w={'full'} 
                h={'full'} 
                borderColor={period === 'current' ? 'green' : 'red'}
                cursor={'pointer'}
                title={period === 'current' ? 'See vehicles Due For Roadworthy Renewal' : 'See vehicles Past Due For Roadworthy Renewal'}
            >
                <CardBody>
                    {isLoading ? (<Spinner />) : (<DisplayStats period={period!} value={data?.data!} />)}
                </CardBody>
            </Card>
        </>
    )
};

export default VehiclesDueForRoadworthyRenewalReportWidget;