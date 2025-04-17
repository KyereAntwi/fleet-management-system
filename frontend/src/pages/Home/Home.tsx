import {
  SimpleGrid,
  Box,
  Button,
  Flex,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import MainNav from "../../components/MainNav";
const Home = () => {
  return (
    <Flex height="100vh" direction={"column"} px={{ base: 6, md: 20 }}>
      <MainNav />
      {/* Hero Section */}
      <Flex
        py={{ base: 32, md: 40 }}
        width="100%"
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        // bgImage="url('https://via.placeholder.com/1600x900?text=Fleet+Background')"
        // bgSize="cover"
        // bgPosition="center"
      >
        <VStack spacing={6}>
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            maxW={"md"}
            textAlign="center"
          >
            Fleet Management Made Easy
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            textAlign="center"
            maxW="600px"
          >
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
            rounded={"full"}
          >
            GET STARTED
          </Button>
        </VStack>
      </Flex>

      {/* How It Works Section */}
      <Box
        id="how-it-works"
        bg={useColorModeValue("white", "gray.800")}
        py={20}
        px={{ base: 6, md: 20 }}
      >
        <Center mb={10}>
          <Heading as="h2" size="xl">
            How It Works
          </Heading>
        </Center>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Box
            p={6}
            bg={useColorModeValue("gray.100", "gray.700")}
            borderRadius="lg"
            boxShadow="md"
          >
            <Heading size="md" mb={2}>
              1. Register Your Fleet
            </Heading>
            <Text>
              Sign up and add your vehicles to the platform in just a few
              clicks.
            </Text>
          </Box>
          <Box
            p={6}
            bg={useColorModeValue("gray.100", "gray.700")}
            borderRadius="lg"
            boxShadow="md"
          >
            <Heading size="md" mb={2}>
              2. Monitor in Real Time
            </Heading>
            <Text>
              Use our dashboard to track vehicles, monitor usage, and receive
              live updates.
            </Text>
          </Box>
          <Box
            p={6}
            bg={useColorModeValue("gray.100", "gray.700")}
            borderRadius="lg"
            boxShadow="md"
          >
            <Heading size="md" mb={2}>
              3. Optimize Operations
            </Heading>
            <Text>
              Generate reports and insights to improve efficiency and reduce
              costs.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        bg={useColorModeValue("gray.100", "gray.700")}
        py={10}
        px={{ base: 6, md: 20 }}
      >
        <Container maxW="7xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
          >
            <Heading size="sm">FleetPro</Heading>
            <HStack spacing={6} mt={{ base: 4, md: 0 }}>
              <Link href="#features">Features</Link>
              <Link href="#how-it-works">How It Works</Link>
              <Link href="#pricing">Pricing</Link>
              <Link href="#contact">Contact</Link>
            </HStack>
          </Flex>
          <Divider my={6} />
          <Text textAlign="center" fontSize="sm">
            &copy; {new Date().getFullYear()} FleetPro. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Flex>
  );
};

export default Home;
