import {NavLink, Outlet, useParams} from "react-router";
import {Box, Button, Flex, Heading, SkeletonText, Spacer} from "@chakra-ui/react";
import useSelectedWorkspaceStore from "../../../store/selectedWorkspaceStore";
import {ButtonGroup} from "@chakra-ui/icons";
import {getAWorkspaceQuery} from "../../../hooks/queries/workspaces/getAWorkspaceQuery";

const WorkspaceManagementLayout = () => {
    const {workspaceId} = useParams();

    // const setSelectedWorkspace = useSelectedWorkspaceStore(
    //     (state) => state.setSelectedWorkspace
    // );
    
    const {data, isLoading} = getAWorkspaceQuery({
        id: workspaceId!
    });
    
    // if (data) {
    //     setSelectedWorkspace(data?.data!);
    // }
    
    return (
        <>
            <Box bgColor={'white'} mb={5} as='nav' position='fixed' width='100%' zIndex='999'>
                <Flex w='80%' mx='auto' flexDirection={'row'} py={4} >
                    {isLoading && (<SkeletonText noOfLines={1} skeletonHeight='2' />)}
                    {data && (
                        <Heading color={'teal.500'} size='lg' as={NavLink} to={`/workspaces/${workspaceId}/management/vehicles`}>
                            {data?.data?.workspaceTitle}
                        </Heading>
                    )}
                    <Spacer />
                    <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'end'} display={{ base: 'none', md: 'flex' } as const}>
                        <ButtonGroup variant={'solid'} colorScheme={'teal'} isAttached>
                            <Button  as={NavLink} to={'dashboard'}>Dashboard</Button>
                            <Button as={NavLink} to={'vehicles'}>Vehicles</Button>
                        </ButtonGroup>
                    </Flex>
                </Flex>
            </Box>
            <Flex as={'section'} flexDirection='column' w='full' pt={20}>
                <Outlet />
            </Flex>
        </>
    )
}

export default WorkspaceManagementLayout