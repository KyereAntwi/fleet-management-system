import {useGetTotalCostOfFuelConsumed} from "../../../hooks/queries/reports/useGetTotalCostOfFuelConsumed";
import {Card, CardBody, Center, Spinner, StatArrow, StatHelpText, StatLabel} from "@chakra-ui/react";
import {Stat, StatNumber} from "@chakra-ui/icons";

interface Props {
    workspaceId: string;
    fromDate: string;
    toDate: string;
}

const TotalCostOfFuelConsumedReportWidget = ({workspaceId, fromDate, toDate}: Props) => {
    const {data, isLoading, error} = useGetTotalCostOfFuelConsumed({
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
                            <StatLabel>TOTAL AMOUNT OF FUEL CONSUMED</StatLabel>
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

export default TotalCostOfFuelConsumedReportWidget;