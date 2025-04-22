import { Box, useColorModeValue } from "@chakra-ui/react";

import { useAuth0 } from "@auth0/auth0-react";

import NavList from "./NavList";
import SideBarHeader from "./SideBarHeader";

export default function SideBar() {
  return (
    <Box
      display={{ base: "none", lg: "block" }}
      borderRight={useColorModeValue(
        "1px solid #f5f5f5",
        "1px solid grba(255,255,255,0.16)"
      )}
      as="aside"
      position="fixed"
      top={24}
      left="0"
      w="250px"
      h="100vh"
      px={3}
      overflow="auto" // or 'auto' if you want sidebar scrolling
    >
      <SideBarHeader />
      <NavList />
    </Box>
  );
}
