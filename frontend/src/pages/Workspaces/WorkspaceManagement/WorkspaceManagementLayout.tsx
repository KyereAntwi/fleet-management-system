import {NavLink, Outlet} from "react-router";
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import {Workspace} from "../../../models/workspaces/workspace";
import useSelectedWorkspaceStore from "../../../store/selectedWorkspaceStore";
import {ButtonGroup} from "@chakra-ui/icons";

const WorkspaceManagementLayout = () => {
    const selectedWorkspace: Workspace = useSelectedWorkspaceStore(
        (state: any) => state.workspace
    );
    return (
        <>
            <Box bgColor={'white'} mb={5} as='nav' position='fixed' width='100%'>
                <Flex w='80%' mx='auto' flexDirection={'row'} py={4} >
                    <Heading color={'teal.500'} size='lg'>
                        {selectedWorkspace.workspaceTitle}
                    </Heading>
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