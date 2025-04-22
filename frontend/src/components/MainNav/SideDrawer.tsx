import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

import SideBarHeader from "./SideBarHeader";
import NavList from "./NavList";

export default function SideDrawer({ mainDrawer }: { mainDrawer: any }) {
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
          <SideBarHeader />
        </DrawerHeader>
        <DrawerBody>
          <NavList />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
