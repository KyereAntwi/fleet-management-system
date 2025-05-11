import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Divider,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Workspace } from "../../models/workspaces/workspace";
import useSelectedWorkspaceStore from "../../store/selectedWorkspaceStore";
import getWorkspacesQuery from "../../hooks/queries/workspaces/getWorkspacesQuery";

export default function SideBarHeader() {
  const navigation = useNavigate();

  const { isAuthenticated } = useAuth0();

  const selectedWorkspace = useSelectedWorkspaceStore(
    (state) => state.workspace
  );

  const setSelectedWorkspace = useSelectedWorkspaceStore(
    (state) => state.setSelectedWorkspace
  );

  const { data, isLoading } = getWorkspacesQuery(true);

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          variant={"outline"}
          rightIcon={<ChevronDownIcon />}
          w={'full'}
        >
          {selectedWorkspace
            ? selectedWorkspace.workspaceTitle
            : "Select Work space"}
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
      <Divider my={3} />
    </>
  );
}
