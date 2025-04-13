import {
    useGetTotalCostOfFleets,
    useGetTotalNumberOfFleets
} from "../../../hooks/queries/reports/useGetTotalCostOfFleets";
import {Card, CardBody, Center, Spinner, StatArrow, StatHelpText, StatLabel} from "@chakra-ui/react";
import {Stat, StatNumber} from "@chakra-ui/icons";

interface Props {
    workspaceId: string;
    fromDate: string;
    toDate: string;
}

const TotalCostOfFleetsReportWidget = ({workspaceId, fromDate, toDate}: Props) => {
    const {data, isLoading, error} = useGetTotalCostOfFleets({
        workspaceId,
        fromDate,
        toDate
    });
    
    const {data: totalNumberOfFleets} = useGetTotalNumberOfFleets({
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
                            <StatLabel>
                                {`TOTAL COST OF ${totalNumberOfFleets ?? totalNumberOfFleets} FLEETS`}
                            </StatLabel>
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

export default TotalCostOfFleetsReportWidget