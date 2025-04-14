import {
    Button,
    Divider,
    Flex,
    Heading, Input, InputGroup, InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer, Table,
    TableContainer, Tbody, useDisclosure
} from "@chakra-ui/react";
import {AddIcon, AttachmentIcon, ButtonGroup, SearchIcon, SettingsIcon, Th, Thead} from "@chakra-ui/icons";
import {getVehiclesQuery} from "../../hooks/queries/vehicles/getVehiclesQuery";
import FullPageLoading from "../../components/UI/FullPageLoading";
import InfoBanner from "../../components/UI/InfoBanner";
import {useParams, useSearchParams} from "react-router";
import {Vehicle} from "../../models/vehicles/vehicle";
import VehicleItem from "./VehicleItem";
import AddVehicleForm from "./AddVehicleForm";
import {useState} from "react";
import AddVehicleBulkForm from "./AddVehicleBulkForm";

const VehiclesList = () => {
    const {workspaceId} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [keyword, setKeyword] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(20)
    const [page, setPage] = useState<number>(1)
    
    const {data, isLoading, error} = getVehiclesQuery({
        workspaceId: workspaceId!,
        page: page,
        pageSize: pageSize,
        keyword: keyword
    });
    
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {isOpen: isOpenBulk, onOpen: onOpenBulk, onClose: onCloseBulk} = useDisclosure();
    
    if (isLoading) {
        return <FullPageLoading />
    }
    
    const dueRoadRenewals = searchParams.get("dueRoadRenewals") ?? '';
    const dueInsuranceRenewals = searchParams.get("dueInsuranceRenewals") ?? '';
    
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
                        <MenuItem icon={<AttachmentIcon />} onClick={onOpenBulk}>
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
                    <>
                        <Flex flexDirection={'row'} w={'full'} mx={'auto'} py={4} alignItems={'space-between'}>
                            <InputGroup size={'sm'} mr={4}>
                                <InputLeftElement pointerEvents='none'>
                                    <SearchIcon color='gray.300' />
                                </InputLeftElement>
                                <Input 
                                    type='tel' 
                                    placeholder='search vehicle here ...'
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </InputGroup>
                            
                            <Spacer />
                            
                            <ButtonGroup size={'sm'} isAttached>
                                <Button>Prev</Button>
                                <Button>Next</Button>
                            </ButtonGroup>
                        </Flex>
                        
                        <TableContainer w={'full'}>
                            <Table variant={'simple'}>
                                <Thead>
                                    <Th>Created At</Th>
                                    <Th>Type and Brand</Th>
                                    <Th>Initial Cost</Th>
                                    <Th>Insurance Renewal Date</Th>
                                    <Th>Mileage Covered</Th>
                                    <Th>Road Worthy Renewal Date</Th>
                                </Thead>
                                <Tbody>
                                    {data?.data?.data.map((vehicle: Vehicle) => (
                                        <VehicleItem key={vehicle.vehicleId} vehicle={vehicle} />
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Flex>
            
            <AddVehicleForm isOpen={isOpen} onClose={onClose} workspaceId={workspaceId!} />
            <AddVehicleBulkForm workspaceId={workspaceId!} isOpen={isOpenBulk} onClose={onCloseBulk} />
        </>
    )
}

export default VehiclesList;