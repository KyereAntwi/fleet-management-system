import {MaintenanceCost} from "../../../models/vehicles/vehicle";
import {IconButton, Table, TableContainer, Tbody, Td, Text, Tr} from "@chakra-ui/react";
import InfoBanner from "../../../components/UI/InfoBanner";
import {DeleteIcon, Th, Thead} from "@chakra-ui/icons";
import {useParams} from "react-router";
import {useRemoveConsumptionCostCommand} from "../../../hooks/mutations/vehicles/useRemoveConsumptionCostCommand";
import Swal from "sweetalert2";
import {VehicleExpenditureType} from "../../../models/vehicles/vehicleRequests";

interface Props {
    expenses: MaintenanceCost[]
}

const ExpensesItem = ({item} : {item: MaintenanceCost}) => {

    const {workspaceId, vehicleId} = useParams();
    const removeMutation = useRemoveConsumptionCostCommand();

    const handleRemoveExpense = async () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure, you want to continue this operation?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                removeMutation.mutateAsync({
                    workspaceId: workspaceId!,
                    vehicleId: vehicleId!,
                    expenditureId: item.id,
                    expenditureType: VehicleExpenditureType.Maintenance
                })
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

const MaintenanceExpenses = ({expenses}: Props) => {
    return (
        <>
            <Text>This section would display the maintenance expenses you had to make for this vehicle.</Text>

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
                            {expenses.map((item: MaintenanceCost) => (<ExpensesItem key={item.createdAt} item={item} />))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}

export default MaintenanceExpenses;