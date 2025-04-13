import {useGetTotalCostOfFleets} from "../../../hooks/queries/reports/useGetTotalCostOfFleets";
import {Card, CardBody, Center, Spinner, StatArrow, StatHelpText, StatLabel} from "@chakra-ui/react";
import {Stat, StatNumber} from "@chakra-ui/icons";
import {useGetTotalCostOfAccidentRepair} from "../../../hooks/queries/reports/useGetTotalCostOfAccidentRepairs";

interface Props {
    workspaceId: string;
    fromDate: string;
    toDate: string;
}

const TotalCostOfAccidentRepairsReportWidget = ({workspaceId, fromDate, toDate}: Props) => {
    const {data, isLoading, error} = useGetTotalCostOfAccidentRepair({
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
                            <StatLabel fontSize={'sm'}>TOTAL COST OF ACCIDENT REPAIRS</StatLabel>
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

export default TotalCostOfAccidentRepairsReportWidget