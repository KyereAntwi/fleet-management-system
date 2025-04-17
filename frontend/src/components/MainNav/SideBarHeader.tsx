import { Avatar, Divider, HStack, Text } from "@chakra-ui/react";

export default function SideBarHeader({ user }: { user: any }) {
  return (
    <>
      {user && (
        <HStack mb={4} px={2}>
          <Avatar mr={2} src={user?.picture} name={user?.name} />
          <Text fontSize={"20px"} fontWeight={"medium"}>
            {user?.name}
          </Text>
        </HStack>
      )}
      <Divider mb={2} />
    </>
  );
}
