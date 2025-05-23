import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useDisclosure, Flex, Box } from "@chakra-ui/react";
import {Outlet, useParams} from "react-router";
import FullPageLoading from "../components/UI/FullPageLoading";
import SideBar from "../components/MainNav/SideBar";
import MainNav from "../components/MainNav";

const ProtectedOutlet = withAuthenticationRequired(Outlet, {
  onRedirecting: () => <FullPageLoading />,
});

const AuthLayout = () => {
    const {workspaceId} = useParams();
  const mainDrawer = useDisclosure();

  return (
    <>
      <MainNav mainDrawer={mainDrawer} />
      <Flex mt={24}>
          {workspaceId && <SideBar />}
        <Flex ml={{ base: 0, lg: "250px" }} p={4} w="full" overflowX="auto">
          <Box width="full">
            <ProtectedOutlet />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AuthLayout;
