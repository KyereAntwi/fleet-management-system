import {Vehicle} from "../../models/vehicles/vehicle";
import {Td, Tr} from "@chakra-ui/react";

interface  Props {
    vehicle: Vehicle
}

const VehicleItem = ({vehicle}: Props) => {
    return (
        <Tr>
            <Td>{new Date(vehicle.createdAt!).toLocaleDateString()}</Td>
            <Td>{vehicle.brandAndType}</Td>
            <Td>GHC {vehicle.initialCost}</Td>
            <Td>{new Date(vehicle.insuranceRenewalDate).toLocaleDateString()}</Td>
            <Td>{vehicle.mileageCovered}</Td>
            <Td>{new Date(vehicle.roadWorthyRenewalDate).toLocaleDateString()}</Td>
        </Tr>
    )
}

export default VehicleItem;