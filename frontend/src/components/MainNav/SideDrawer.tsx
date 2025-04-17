import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

import { Workspace } from "../../models/workspace/workspace";
import SideBarHeader from "./SideBarHeader";
import NavList from "./NavList";

export default function SideDrawer({
  mainDrawer,
  user,
  selectedWorkspace,
}: {
  mainDrawer: any;
  user: any;
  selectedWorkspace: Workspace;
}) {
  return (
    <Drawer
      placement="left"
      isOpen={mainDrawer.isOpen}
      onClose={mainDrawer.onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <SideBarHeader user={user} />
        </DrawerHeader>
        <DrawerBody>
          <NavList selectedWorkspace={selectedWorkspace} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
