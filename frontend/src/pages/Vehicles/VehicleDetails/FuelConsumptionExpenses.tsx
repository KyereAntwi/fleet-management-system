import {FuelConsumed} from "../../../models/vehicles/vehicle";
import {IconButton, Table, TableContainer, Tbody, Td, Text, Tr} from "@chakra-ui/react";
import {DeleteIcon, Th, Thead} from "@chakra-ui/icons";
import InfoBanner from "../../../components/UI/InfoBanner";

interface Props {
    expenses: FuelConsumed[]
}

const ExpensesItem = ({item} : {item: FuelConsumed}) => {

    const handleRemoveExpense = async () => {
        console.log(item);
    }

    return (
        <Tr>
            <Td>{item.fuelConsumedValue}</Td>
            <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
            <Td>
                <IconButton
                    size={'sm'}
                    aria-label={'remove expense'}
                    icon={<DeleteIcon />}
                    title={'Delete expense'}
                    onClick={handleRemoveExpense}
                />
            </Td>
        </Tr>
    )
}

const FuelConsumptionExpenses = ({expenses}: Props) => {
    return (
        <>
            <Text>This section would display the fuel consumption expenses you had to make for this vehicle.</Text>

            {expenses.length === 0 && (
                <InfoBanner message={'There are no records to display at this time'} />
            )}

            {expenses.length > 0 && (
                <TableContainer>
                    <Table variant={'striped'} size={'sm'}>
                        <Thead>
                            <Th>Cost</Th>
                            <Th>Created At</Th>
                        </Thead>
                        <Tbody>
                            {expenses.map((item: FuelConsumed) => (<ExpensesItem key={item.createdAt} item={item} />))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}

export default FuelConsumptionExpenses;