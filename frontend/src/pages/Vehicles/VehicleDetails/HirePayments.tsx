import {HirePayment} from "../../../models/vehicles/vehicle";
import {useParams} from "react-router";
import Swal from "sweetalert2";
import {VehicleExpenditureType} from "../../../models/vehicles/vehicleRequests";
import {IconButton, Table, TableContainer, Tbody, Td, Text, Tr} from "@chakra-ui/react";
import {DeleteIcon, Th, Thead} from "@chakra-ui/icons";
import InfoBanner from "../../../components/UI/InfoBanner";

interface Props {
    expenses: HirePayment[]
}

const ExpensesItem = ({item} : {item: HirePayment}) => {

    const {workspaceId, vehicleId} = useParams();

    const handleRemoveExpense = async () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure, you want to continue this operation?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                // to implement later
            } else if (result.isDenied) {
                return;
            }
        });
    }

    return (
        <Tr>
            <Td>{item.cost}</Td>
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

const HirePayments = ({expenses}: Props) => {
    return(
        <>
            <Text>This section would display the hiring payments you have received for this vehicle.</Text>

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
                            {expenses.map((item: HirePayment) => (<ExpensesItem key={item.createdAt} item={item} />))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}

export default HirePayments;