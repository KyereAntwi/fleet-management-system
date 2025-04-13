import {useTotalCostOfMaintenance} from "../../../hooks/queries/reports/useTotalCostOfMaintenance";
import {Card, CardBody, Center, Spinner, StatArrow, StatHelpText, StatLabel} from "@chakra-ui/react";
import {Stat, StatNumber} from "@chakra-ui/icons";

interface Props {
    workspaceId: string;
    fromDate: string;
    toDate: string;
}

const TotalCostOfMaintenanceReportWidget = ({workspaceId, fromDate, toDate}: Props) => {
    const {data, isLoading, error} = useTotalCostOfMaintenance({
        workspaceId,
        fromDate,
        toDate
    });

    if (error) {
        console.error(error);
        throw error;
    }

    return (
        <Card
            w={'full'}
            h={'full'}
        >
            <CardBody>
                {isLoading ? (<Spinner />) : (
                    <Center>
                        <Stat>
                            <StatLabel>TOTAL COST OF MAINTENANCE</StatLabel>
                            <StatNumber fontSize={'5xl'}>{`GHC ${data!}`}</StatNumber>
                            <StatHelpText>
                                <StatArrow type='increase' />
                                In Ghana Cedis
                            </StatHelpText>
                        </Stat>
                    </Center>
                )}
            </CardBody>
        </Card>
    )
}

export default TotalCostOfMaintenanceReportWidget