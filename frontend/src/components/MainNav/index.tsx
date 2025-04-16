import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  useColorMode,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import UserSummary from "./UserSummary";
import { NavLink, useNavigate } from "react-router";
import useSelectedWorkspaceStore from "../../store/selectedWorkspaceStore";
import { useEffect, useState } from "react";
import getWorkspacesQuery from "../../hooks/queries/workspaces/getWorkspacesQuery";
import { Workspace } from "../../models/workspaces/workspace";

const MainNav = () => {
  const [loadWorkspaces, setLoadWorkspaces] = useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigation = useNavigate();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const selectedWorkspace: Workspace = useSelectedWorkspaceStore(
    (state: any) => state.workspace
  );
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
        py={4}
        // mb={5}
      >
        <Flex w="80%" mx="auto" flexDirection={"row"}>
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
            {isAuthenticated ? (
              <UserSummary drawerState={false} />
            ) : (
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
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            display={
              { base: "flex", md: "none" } as { base: string; md: string }
            }
            onClick={onOpen}
          />
        </Flex>
      </Box>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            {selectedWorkspace && (
              <>
                <Menu>
                  <MenuButton
                    as={Button}
                    variant={"outline"}
                    rightIcon={<ChevronDownIcon />}
                    my={4}
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
            <VStack spacing={4}>
              {isAuthenticated ? (
                <UserSummary drawerState={true} />
              ) : (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </Button>
              )}
              <Button
                w="100%"
                onClick={toggleColorMode}
                colorScheme="teal"
                variant="outline"
              >
                {colorMode === "light" ? "Dark" : "Light"} Mode
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MainNav;
