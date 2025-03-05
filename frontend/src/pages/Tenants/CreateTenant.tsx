import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  VStack,
  Text,
  Card,
  CardBody,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { createTenantMutation } from "../../hooks/mutations/tenants/createTenantCommand";
import {
  CreateATenantRequest,
  TenantSubscription,
} from "../../models/tenants/tenantRequests";
import { useAuth0 } from "@auth0/auth0-react";

const CreateTenant = () => {
  const { user } = useAuth0();
  const { email } = user as {
    email: string;
  };

  const createTenant = createTenantMutation({
    createDefaultWorkspace: () => {
      console.log("Tenant created successfully");
    },
  });

  const onSubmit = async (data: CreateATenantRequest) => {
    createTenant.mutateAsync(data);
  };

  return (
    <Center height="100vh" p={4}>
      <VStack spacing={8} textAlign="center">
        <Heading as="h1" size="2xl" fontWeight="bold">
          Create a Tenant Account
        </Heading>
        <Text fontSize="lg" maxW="600px">
          Choose the type of tenant account that best suits your needs. Whether
          you are looking for a free account or a paid account with additional
          features, we have the right option for you.
        </Text>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={6}
          width="100%"
          maxW="800px"
        >
          <Card p={6} boxShadow="md" borderRadius="md">
            <CardBody>
              <Heading as="h2" size="lg" mb={4}>
                Free Tenant Account
              </Heading>
              <List spacing={3} mb={4} textAlign="left">
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  Basic features
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  Manage your fleet efficiently
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  Create one workspace
                </ListItem>
              </List>
              <Button
                colorScheme="teal"
                size="md"
                fontWeight="bold"
                isLoading={createTenant.isPending}
                onClick={() =>
                  onSubmit({
                    userId: email,
                    subscription: TenantSubscription.Free,
                  })
                }
              >
                Create Free Account
              </Button>
            </CardBody>
          </Card>
          <Card p={6} boxShadow="md" borderRadius="md">
            <CardBody>
              <Heading as="h2" size="lg" mb={4}>
                Paid Tenant Account
              </Heading>
              <List spacing={3} mb={4} textAlign="left">
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  Additional features
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  Premium support
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  Create multiple workspaces
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  Advanced tools for fleet management
                </ListItem>
              </List>
              <Button
                colorScheme="teal"
                size="md"
                fontWeight="bold"
                isLoading={createTenant.isPending}
                onClick={() =>
                  onSubmit({
                    userId: email,
                    subscription: TenantSubscription.Payed,
                  })
                }
              >
                Create Paid Account
              </Button>
            </CardBody>
          </Card>
        </Grid>
      </VStack>
    </Center>
  );
};

export default CreateTenant;
