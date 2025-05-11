import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import MainNav from "../components/MainNav";

const PublicLayout = () => {
  return (
    <>
      <MainNav />
      <Flex mt={24}>
        <Flex ml={{ base: 0 }} p={4} w="full" overflowX="auto">
          <Box width="full">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default PublicLayout;
