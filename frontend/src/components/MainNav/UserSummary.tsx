import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import {useNavigate} from "react-router";
import useSelectedWorkspaceStore from "../../store/selectedWorkspaceStore";

interface Props {
  drawerState: boolean
}

const UserSummary = ({drawerState}: Props) => {
  const { logout, user } = useAuth0();
  const { name, picture, email } = user as {
    name: string;
    picture: string;
    email: string;
  };

  const navigation = useNavigate();
  const restoreSelectedWorkspace = useSelectedWorkspaceStore(
      (state) => state.resetSelectedWorkspace
  );

  return (
    <Box mr={4}>
      <Menu>
        <MenuButton>
          {drawerState ? (
              <HStack>
                <Avatar mr={2} src={picture} name={name} />
                <Text>{name}</Text>
              </HStack>
          ) : <Avatar src={picture} name={name} />}
        </MenuButton>
        <MenuList>
          <MenuGroup title="Profile">
            <MenuItem>
              <VStack align="start">
                <HStack>
                  <Avatar size="sm" src={picture} name={name} />
                  <Spacer />
                  <Text>{name}</Text>
                </HStack>
                <Text>{email}</Text>
              </VStack>
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Settings">
            <MenuItem onClick={() => {
              restoreSelectedWorkspace()
              navigation('/workspaces')
            }}>Workspaces</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem
              onClick={() =>
                logout({
                  returnTo: window.location.origin,
                })
              }
            >
              Logout
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};
export default UserSummary;
