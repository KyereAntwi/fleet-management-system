import React from "react";

import { Flex, Box } from "@chakra-ui/react";

const LinkContainer = ({
  icon,
  isActive,
  label,
}: {
  icon?: React.ReactNode;
  isActive: boolean;
  label: string;
}) => (
  <Flex
    align="center"
    p="2"
    mx="2"
    borderRadius="lg"
    role="group"
    fontSize="14px"
    cursor="pointer"
    {...(isActive // <-- conditionally apply active props/styling/etc
      ? {
          bg: "teal.600",
          color: "#fff",
          borderColor: "teal.700",
        }
      : {})}
    _hover={{
      bg: "#f5f5f5",
      color: "teal.600",
      borderColor: "teal.700",
    }}
  >
    <Box
      p="4px"
      border="1px"
      borderRadius="full"
      borderColor="gray.200"
      fontSize="26"
    >
      {icon}
    </Box>
    <Box ml={2} fontSize="sm">
      {label}
    </Box>
  </Flex>
);

export default LinkContainer;
