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
    TableContainer
} from "@chakra-ui/react";
import {AddIcon, AttachmentIcon, SettingsIcon} from "@chakra-ui/icons";
import {getVehiclesQuery} from "../../hooks/queries/vehicles/getVehiclesQuery";
import FullPageLoading from "../../components/UI/FullPageLoading";
import InfoBanner from "../../components/UI/InfoBanner";
import {Workspace} from "../../models/workspaces/workspace";
import useSelectedWorkspaceStore from "../../store/selectedWorkspaceStore";

const VehiclesList = () => {
    const selectedWorkspace: Workspace = useSelectedWorkspaceStore(
        (state: any) => state.workspace
    );
    
    const {data, isLoading, error} = getVehiclesQuery({
        workspaceId: selectedWorkspace.id!,
        page: 1,
        pageSize: 20,
        keyword: ''
    });
    
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
                        <MenuItem icon={<AddIcon />} command='⌘T'>
                            Add single manually
                        </MenuItem>
                        <MenuItem icon={<AttachmentIcon />} command='⌘N'>
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
                            
                        </Table>
                    </TableContainer>
                )}
            </Flex>
        </>
    )
}

export default VehiclesList;