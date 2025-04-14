import {
    useGetVehiclesDueForInsuranceRenewalsPerWorkspace
} from "../../../hooks/queries/reports/useGetVehiclesDueForInsuranceRenewalsPerWorkspace";
import {
    Card,
    CardBody,
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
import {Vehicle} from "../../../models/vehicles/vehicle";
import {Stat, StatNumber} from "@chakra-ui/icons";
import {useNavigate} from "react-router";

interface Props {
    workspaceId: string;
    period?: string;
}

const DisplayStats = ({period, value} : {period: string, value: number}) => {
    return (
        <>
            {period === 'current' ? (
                <Stat>
                    <StatLabel>DUE INSURANCE RENEWAL</StatLabel>
                    <StatNumber fontSize={'6xl'}>{value}</StatNumber>
                    <StatHelpText>
                        <StatArrow type='increase' />
                    </StatHelpText>
                </Stat>
            ) : (
                <Stat>
                    <StatLabel>PAST INSURANCE RENEWAL</StatLabel>
                    <StatNumber fontSize={'6xl'}>{value}</StatNumber>
                    <StatHelpText>
                        <StatArrow type='decrease' />
                    </StatHelpText>
                </Stat>
            )}
        </>
    )
}

const VehicleDueForInsuranceRenewalReportWidget =  ({workspaceId, period}: Props) => {
    const {data, isLoading, error} = useGetVehiclesDueForInsuranceRenewalsPerWorkspace({
        workspaceId: workspaceId,
        period: period
    });

    const navigation = useNavigate();

    if (error) {
        console.log(error);
        throw error;
    }

    const onRoute = () => navigation(`/workspaces/${workspaceId}/management/vehicles?dueInsuranceRenewals=${period}`);

    return (
        <>
            <Card 
                w={'full'} 
                h={'full'} 
                borderColor={period === 'current' ? 'green' : 'red'}
                cursor={'pointer'}
                title={period === 'current' ? 'See vehicle Due For Insurance Renewal' : 'See vehicle Past Due For Insurance Renewal'}
                onClick={onRoute}
            >
                <CardBody>
                    {isLoading ? (<Spinner />) : (<DisplayStats period={period!} value={data?.data!} />)}
                </CardBody>
            </Card>
        </>
    )
}

export default VehicleDueForInsuranceRenewalReportWidget