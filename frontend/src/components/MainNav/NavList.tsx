import { Button, Divider, Heading, Spacer, Stack } from "@chakra-ui/react";

import { NavLink } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

import useSelectedWorkspaceStore from "../../store/selectedWorkspaceStore";
import {
  AdjustmentsVerticalIcon,
  TruckIcon,
  ShieldCheckIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

import LinkItem from "./LinkItem";

export default function NavList() {
  const selectedWorkspace = useSelectedWorkspaceStore(
    (state) => state.workspace
  );
  const { logout } = useAuth0();
  return (
    <Stack spacing={4} h={"100%"}>
      <NavLink to="/workspaces" end>
        {({ isActive }) => (
          <LinkItem
            isActive={isActive}
            label={"Work Spaces"}
            icon={<BuildingOffice2Icon width={20} height={20} />}
          />
        )}
      </NavLink>
      {selectedWorkspace && (
        <>
          <Heading fontSize={"sm"} fontWeight={"medium"} mt={5} mb={2}>
            {selectedWorkspace.workspaceTitle}
          </Heading>
          <Divider />
          <NavLink
            to={`/workspaces/${selectedWorkspace.id}/management/dashboard`}
            end
          >
            {({ isActive }) => (
              <LinkItem
                isActive={isActive}
                label={"Dashboard"}
                icon={<AdjustmentsVerticalIcon width={20} height={20} />}
              />
            )}
          </NavLink>
          <NavLink
            to={`/workspaces/${selectedWorkspace.id}/management/vehicles`}
            end
          >
            {({ isActive }) => (
              <LinkItem
                isActive={isActive}
                label={"Vehicles"}
                icon={<TruckIcon width={20} height={20} />}
              />
            )}
          </NavLink>
          <Divider />
        </>
      )}
      <Spacer />
      <Button
        colorScheme="teal"
        size={"md"}
        w={"220px"}
        variant="outline"
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        Log Out
      </Button>
    </Stack>
  );
}
