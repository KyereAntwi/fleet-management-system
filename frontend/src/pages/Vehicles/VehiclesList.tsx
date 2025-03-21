import {
    Button,
    Divider,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer, Table,
    TableContainer, Tbody, useDisclosure
} from "@chakra-ui/react";
import {AddIcon, AttachmentIcon, SettingsIcon} from "@chakra-ui/icons";
import {getVehiclesQuery} from "../../hooks/queries/vehicles/getVehiclesQuery";
import FullPageLoading from "../../components/UI/FullPageLoading";
import InfoBanner from "../../components/UI/InfoBanner";
import {useParams} from "react-router";
import {Vehicle} from "../../models/vehicles/vehicle";
import VehicleItem from "./VehicleItem";
import AddVehicleForm from "./AddVehicleForm";

const VehiclesList = () => {
    const {workspaceId} = useParams();
    
    const {data, isLoading, error} = getVehiclesQuery({
        workspaceId: workspaceId!,
        page: 1,
        pageSize: 20,
        keyword: ''
    });
    
    const {isOpen, onOpen, onClose} = useDisclosure();
    
    if (isLoading) {
        return <FullPageLoading />
    }
    
    return (
        <>
            <Flex as={'section'} flexDirection={'row'} w={'80%'} mx={'auto'} py={4}>
                <Heading mb={2} fontSize={{
                    sm: '1.2rem',
                    md: '1.8rem',
                }}>List of Vehicles</Heading>
                <Spacer />
                <Menu>
                    <MenuButton
                        as={Button}
                        aria-label='Options'
                        icon={<SettingsIcon />}
                        variant='solid'
                        size={{
                            sm: 'sm',
                            md: 'md'
                        }}
                        bg={'teal.400'}
                    >Add a new vehicle</MenuButton>
                    <MenuList>
                        <MenuItem icon={<AddIcon />} onClick={onOpen}>
                            Add single manually
                        </MenuItem>
                        <MenuItem icon={<AttachmentIcon />}>
                            Import an Excel file
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            
            <Divider />

            <Flex as={'section'} flexDirection={'column'} w={'80%'} mx={'auto'} py={4}>
                {data?.data?.count! == 0 && (
                    <InfoBanner message={'There are no records found'} />
                )}

                {data?.data?.count! > 0 && (
                    <TableContainer w={'full'}>
                        <Table variant={'simple'}>
                            <Tbody>
                                {data?.data?.data.map((vehicle: Vehicle) => (
                                    <VehicleItem vehicle={vehicle} />
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </Flex>
            
            <AddVehicleForm isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default VehiclesList;