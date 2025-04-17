import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useDisclosure, Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import FullPageLoading from "../components/UI/FullPageLoading";
import SideBar from "../components/MainNav/SideBar";
import MainNav from "../components/MainNav";

import useSelectedWorkspaceStore from "../store/selectedWorkspaceStore";
import { Workspace } from "../models/workspaces/workspace";

const ProtectedOutlet = withAuthenticationRequired(Outlet, {
  onRedirecting: () => <FullPageLoading />,
});

const AuthLayout = () => {
  const mainDrawer = useDisclosure();
  const selectedWorkspace: Workspace = useSelectedWorkspaceStore(
    (state: any) => state.workspace
  );

  return (
    <>
      <MainNav selectedWorkspace={selectedWorkspace} mainDrawer={mainDrawer} />
      <Flex mt={24}>
        <SideBar
          selectedWorkspace={selectedWorkspace}
          mainDrawer={mainDrawer}
        />
        <Flex ml={{ base: 0, lg: "250px" }} p={4} w="full" overflowX="auto">
          <Box h="100vh" width="full">
            <ProtectedOutlet />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AuthLayout;
