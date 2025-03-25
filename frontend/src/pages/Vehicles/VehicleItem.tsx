import {Vehicle} from "../../models/vehicles/vehicle";
import {Td, Text, Tr} from "@chakra-ui/react";
import {NavLink, useParams} from "react-router";

interface  Props {
    vehicle: Vehicle
}

const VehicleItem = ({vehicle}: Props) => {
    const {workspaceId} = useParams();
    return (
        <Tr>
            <Td>{new Date(vehicle.createdAt!).toLocaleDateString()}</Td>
            <Td fontWeight={'bold'}>
                <Text as={NavLink} to={`/workspaces/${workspaceId!}/management/vehicles/${vehicle.vehicleId}`}>{vehicle.brandAndType}</Text>
            </Td>
            <Td>GHC {vehicle.initialCost}</Td>
            <Td>{new Date(vehicle.insuranceRenewalDate).toLocaleDateString()}</Td>
            <Td>{vehicle.mileageCovered}</Td>
            <Td>{new Date(vehicle.roadWorthyRenewalDate).toLocaleDateString()}</Td>
        </Tr>
    )
}

export default VehicleItem;