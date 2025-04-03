import {Button, Center, Heading, Text, VStack} from "@chakra-ui/react";
import {NavLink} from "react-router";

const PageNotFound = () => {
  return (
      <Center height="100vh" p={4}>
        <VStack spacing={{ base: 4, md: 8 }} textAlign="center">
          <Heading as="h1" size={{ base: "xl", md: "2xl" }} fontWeight="bold">
            Sorry Page requested was not found
          </Heading>
          <Button
              colorScheme="teal"
              size={{ base: "md", md: "lg" }}
              fontWeight="bold"
              as={NavLink}
              to={"/"}
          >
            Go to home page
          </Button>
        </VStack>
      </Center>
  );
};

export default PageNotFound;
