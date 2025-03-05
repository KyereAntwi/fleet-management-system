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
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import UserSummary from "./UserSummary";
import { NavLink } from "react-router";

const MainNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <Box
      as="nav"
      position="fixed"
      width="100%"
      bgColor={colorMode === "light" ? "teal.500" : "teal.800"}
      p={4}
      zIndex="1000"
    >
      <Flex align="center" maxW="1200px" mx="auto">
        <Heading as={NavLink} size="lg" color="white" to="/">
          Fleets Management
        </Heading>
        <Spacer />
        <Flex display={{ base: "none", md: "flex" } as const}>
          {isAuthenticated ? (
            <UserSummary />
          ) : (
            <Button
              colorScheme="teal"
              variant="outline"
              mr={4}
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          )}
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="theme-toggle" mb="0" color="white">
              {colorMode === "light" ? "Dark" : "Light"} Mode
            </FormLabel>
            <Switch
              id="theme-toggle"
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
              colorScheme="teal"
            />
          </FormControl>
        </Flex>
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          display={{ base: "flex", md: "none" } as { base: string; md: string }}
          onClick={onOpen}
        />
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <Button
                w="100%"
                colorScheme="teal"
                variant="outline"
                onClick={() => loginWithRedirect()}
              >
                Login
              </Button>
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
    </Box>
  );
};

export default MainNav;
