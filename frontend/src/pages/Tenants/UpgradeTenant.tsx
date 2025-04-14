import {Button, Card, CardBody, Center, Heading, List, ListIcon, ListItem, Text, VStack} from "@chakra-ui/react";
import {CheckCircleIcon} from "@chakra-ui/icons";
import {TenantSubscription, UpdateTenantSubscription} from "../../models/tenants/tenantRequests";
import {useUpgradeTenantSubscription} from "../../hooks/mutations/tenants/useUpgradeTenantSubscription";

const UpgradeTenant = () => {
    
    const upgradeMutation = useUpgradeTenantSubscription();
    
    const onUpgrade = (data: UpdateTenantSubscription) => {
        upgradeMutation.mutateAsync(data);
    }
    
    return (
        <Center height={'100vh'} p={4}>
            <VStack spacing={8} textAlign={'center'}>
                <Heading as='h1' size='2xl' fontWeight='bold'>
                    Upgrade your Tenant Account
                </Heading>
                <Text fontSize='lg' maxW='600px'>
                    Choose the type of tenant account that best suits your needs.
                </Text>

                <Card p={6} boxShadow='md' borderRadius='md'>
                    <CardBody>
                        <Heading as='h2' size='lg' mb={4}>
                            Paid Tenant Account
                        </Heading>
                        <List spacing={3} mb={4} textAlign='left'>
                            <ListItem>
                                <ListIcon as={CheckCircleIcon} color='teal.500' />
                                Additional features
                            </ListItem>
                            <ListItem>
                                <ListIcon as={CheckCircleIcon} color='teal.500' />
                                Premium support
                            </ListItem>
                            <ListItem>
                                <ListIcon as={CheckCircleIcon} color='teal.500' />
                                Create multiple workspaces
                            </ListItem>
                            <ListItem>
                                <ListIcon as={CheckCircleIcon} color='teal.500' />
                                Advanced tools for fleet management
                            </ListItem>
                        </List>
                        <Button
                            colorScheme='teal'
                            size='md'
                            fontWeight='bold'
                            isLoading={upgradeMutation.isPending}
                            onClick={() => onUpgrade({
                                subscription: TenantSubscription.Payed
                            })}
                        >
                            Create Paid Account
                        </Button>
                    </CardBody>
                </Card>
            </VStack>
        </Center>
    )
}
export default UpgradeTenant;