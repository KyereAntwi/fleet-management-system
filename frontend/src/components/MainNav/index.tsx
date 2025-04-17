import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  IconButton,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import SideDrawer from "./SideDrawer";

import { NavLink, useNavigate } from "react-router";
import { Workspace } from "../../models/workspaces/workspace";
import useSelectedWorkspaceStore from "../../store/selectedWorkspaceStore";
import getWorkspacesQuery from "../../hooks/queries/workspaces/getWorkspacesQuery";

const MainNav = ({
  selectedWorkspace,
  mainDrawer,
}: {
  selectedWorkspace?: Workspace;
  mainDrawer?: any;
}) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigation = useNavigate();

  const [loadWorkspaces, setLoadWorkspaces] = useState<boolean>(false);
  const setSelectedWorkspace = useSelectedWorkspaceStore(
    (state) => state.setSelectedWorkspace
  );

  const { data, isLoading } = getWorkspacesQuery(loadWorkspaces);

  useEffect(() => {
    if (isAuthenticated && selectedWorkspace) {
      setLoadWorkspaces(true);
    }
  }, [isAuthenticated]);

  return (
    <>
      {/* Side Drawer */}
      {mainDrawer && (
        <SideDrawer
          user={user}
          mainDrawer={mainDrawer}
          selectedWorkspace={selectedWorkspace}
        />
      )}
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        width="100%"
        bgColor={colorMode === "light" ? "teal.500" : "teal.800"}
        zIndex="1000"
        boxShadow="sm"
        height={20}
        py={4}
        // mb={5}
      >
        <Flex w="80%" mx="auto" flexDirection={"row"}>
          {isAuthenticated && mainDrawer && (
            <IconButton
              icon={<HamburgerIcon />}
              aria-label="Open menu"
              variant="outline"
              onClick={mainDrawer.onOpen}
              display={{ base: "inline-flex", lg: "none" }}
              mr={2}
            />
          )}
          <Heading as={NavLink} size="lg" color={"white"} to="/">
            FleetPro
          </Heading>
          <Spacer />
          <Flex
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"end"}
            display={{ base: "none", md: "flex" } as const}
          >
            {selectedWorkspace && (
              <>
                <Menu>
                  <MenuButton
                    w={"lg"}
                    as={Button}
                    variant={"outline"}
                    rightIcon={<ChevronDownIcon />}
                    mr={4}
                  >
                    {selectedWorkspace.workspaceTitle}
                  </MenuButton>
                  <MenuList>
                    {!isLoading &&
                      data?.data!.map((workspace: Workspace) => (
                        <MenuItem
                          key={workspace.id}
                          onClick={() => {
                            setSelectedWorkspace(workspace);
                            navigation(
                              `/workspaces/${workspace.id}/management/dashboard`
                            );
                          }}
                        >
                          {workspace.workspaceTitle}
                        </MenuItem>
                      ))}
                  </MenuList>
                </Menu>
              </>
            )}
            {/* {isAuthenticated ? (
              <UserSummary drawerState={false} /> */}
            {!isAuthenticated && (
              <Button
                variant="outline"
                rounded={"full"}
                mr={4}
                onClick={() => loginWithRedirect()}
              >
                Login
              </Button>
            )}
            <Box>
              <HStack>
                <IconButton
                  aria-label="Toggle theme"
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                  variant="ghost"
                />
              </HStack>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default MainNav;
