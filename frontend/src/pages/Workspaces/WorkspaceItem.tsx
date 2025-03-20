import { HamburgerIcon, SettingsIcon, ViewIcon } from '@chakra-ui/icons';
import { Workspace } from '../../models/workspaces/workspace';
import {
  Avatar,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router';
import useSelectedWorkspaceStore from '../../store/selectedWorkspaceStore';

interface Props {
  workspace: Workspace;
}

const WorkspaceItem = ({ workspace }: Props) => {
  const navigation = useNavigate();

  const setSelectedWorkspace = useSelectedWorkspaceStore(
    (state) => state.setSelectedWorkspace
  );

  const handleViewWorkspaceDetails = () => {
    setSelectedWorkspace(workspace);
    navigation(`\workspaces\${workspace.id}\dashboard`);
  };

  return (
    <Tr>
      <Td>
        <Avatar size={'lg'} name={workspace.workspaceTitle} />
      </Td>
      <Td>
        <VStack alignItems={'start'} justifyContent={'center'} px={5}>
          <Heading size={'lg'}>{workspace.workspaceTitle}</Heading>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {'Created By: ' + workspace.createdBy}
          </Text>
          <Text fontSize={'sm'}>
            {'Created At: ' + new Date(workspace.createdAt).toDateString()}
          </Text>
        </VStack>
      </Td>
      <Td>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          />
          <MenuList>
            <MenuItem icon={<ViewIcon />} onClick={handleViewWorkspaceDetails}>
              Manage Workspace
            </MenuItem>
            <MenuItem
              as={NavLink}
              to={`/workspaces/${workspace.id}/settings`}
              icon={<SettingsIcon />}
            >
              Workspace Settings
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default WorkspaceItem;
