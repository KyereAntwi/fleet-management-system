import { Button, Divider, Heading, Stack } from "@chakra-ui/react";

import { NavLink } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

import { Workspace } from "../../models/workspace/workspace";
import {
  AdjustmentsVerticalIcon,
  TruckIcon,
  ShieldCheckIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

import LinkItem from "./LinkItem";

export default function NavList({
  selectedWorkspace,
}: {
  selectedWorkspace: Workspace;
}) {
  const { logout } = useAuth0();
  return (
    <Stack spacing={4}>
      {selectedWorkspace && (
        <>
          <Heading fontSize={"sm"} fontWeight={"normal"}>
            {selectedWorkspace.workspaceTitle}
          </Heading>
          <Divider />
          <NavLink
            to={`/workspaces/${selectedWorkspace.id}/management/dashboard`}
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
      <NavLink to="/workspaces">
        {({ isActive }) => (
          <LinkItem
            isActive={isActive}
            label={"Work Spaces"}
            icon={<BuildingOffice2Icon width={20} height={20} />}
          />
        )}
      </NavLink>
      <NavLink to={`/upgrade-tenant`}>
        {({ isActive }) => (
          <LinkItem
            isActive={isActive}
            label={"Upgrade Subscripttion"}
            icon={<ShieldCheckIcon width={20} height={20} />}
          />
        )}
      </NavLink>
      <Button
        colorScheme="teal"
        position="fixed"
        bottom={5}
        left={5}
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
