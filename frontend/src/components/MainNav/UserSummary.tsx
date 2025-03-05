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

const UserSummary = () => {
  const { logout, user } = useAuth0();
  const { name, picture, email } = user as {
    name: string;
    picture: string;
    email: string;
  };

  return (
    <Box mr={4}>
      <Menu>
        <MenuButton>
          <Avatar src={picture} name={name} />
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
            <MenuItem>Workspaces</MenuItem>
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
