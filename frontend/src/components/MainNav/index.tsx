import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  IconButton,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import SideDrawer from "./SideDrawer";

import {NavLink, useParams} from "react-router";
import UserSummary from "./UserSummary";

const MainNav = ({ mainDrawer }: { mainDrawer?: any }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { colorMode, toggleColorMode } = useColorMode();
  const { workspaceId } = useParams();

  return (
    <>
      {/* Side Drawer */}
      {(workspaceId && mainDrawer) && <SideDrawer mainDrawer={mainDrawer} />}
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
        <Flex px="15px" flexDirection={"row"}>
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
        </Flex>
      </Box>
    </>
  );
};

export default MainNav;
