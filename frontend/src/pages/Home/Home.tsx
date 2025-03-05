import { Button, Center, Heading, VStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";

const Home = () => {
  return (
    <Center height="100vh" p={4}>
      <VStack spacing={{ base: 4, md: 8 }} textAlign="center">
        <Heading as="h1" size={{ base: "xl", md: "2xl" }} fontWeight="bold">
          Fleet Management Made Easy
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} maxW="600px">
          Manage your fleet efficiently with our comprehensive and easy-to-use
          platform. Track vehicles, schedule maintenance, and optimize routes
          all in one place.
        </Text>
        <Button
          colorScheme="teal"
          size={{ base: "md", md: "lg" }}
          fontWeight="bold"
          as={NavLink}
          to={"/get-started"}
        >
          GET STARTED
        </Button>
      </VStack>
    </Center>
  );
};

export default Home;
