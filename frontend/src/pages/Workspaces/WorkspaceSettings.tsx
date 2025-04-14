import { useNavigate, useParams } from 'react-router';
import { getAWorkspaceQuery } from '../../hooks/queries/workspaces/getAWorkspaceQuery';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  Spacer,
  Stack,
  StackDivider,
  Divider,
  CardFooter,
  Button, useDisclosure,
} from '@chakra-ui/react';
import FullPageLoading from '../../components/UI/FullPageLoading';
import { EditIcon } from '@chakra-ui/icons';
import { deleteWorkspaceCommand } from '../../hooks/mutations/workspaces/deleteWorkspaceCommand';
import AddWorkspaceForm from "./AddWorkspaceForm";

const WorkspaceSettings = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  if (id === undefined) {
    navigation('/workspaces');
  }

  const { data: workspace, isLoading, error } = getAWorkspaceQuery({ id: id! });
  const deleteMutation = deleteWorkspaceCommand();
  const {onClose, isOpen, onOpen} = useDisclosure();

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (error) {
    console.error('Error occured', error);
    throw new Error('Error occured', error);
  }

  const handleDeleteWorkspace = async () => {
    deleteMutation.mutateAsync(workspace?.data?.id!);
  };

  return (
    <>
      <Flex as={'section'} flexDirection='column' w='full' pt={20}>
        <Card
            mt={5}
            w={{
              md: '60%',
              sm: 'full',
            }}
            mx={'auto'}
        >
          <CardHeader>
            <HStack>
              <Avatar
                  name={workspace?.data?.workspaceTitle}
                  size={{
                    md: 'md',
                    sm: 'sm',
                  }}
              />

              <Heading
                  size={{
                    md: 'md',
                    sm: 'sm',
                  }}
              >
                {workspace?.data?.workspaceTitle}
              </Heading>

              <Spacer />

              <IconButton
                  icon={<EditIcon />}
                  aria-label='edit workspace'
                  variant={'solid'}
                  bg={'teal.400'}
                  isDisabled={deleteMutation.isPending}
                  onClick={onOpen}
              />
            </HStack>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing={4}>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Created By:
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {workspace?.data?.createdBy}
                </Text>
              </Box>

              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Created At:
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {new Date(workspace?.data?.createdAt!).toDateString()}
                </Text>
              </Box>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
                variant={'outline'}
                colorScheme='red'
                onClick={handleDeleteWorkspace}
                isLoading={deleteMutation.isPending}
            >
              Delete workspace completely
            </Button>
          </CardFooter>
        </Card>
      </Flex>
      {workspace ? <AddWorkspaceForm isOpen={isOpen} onClose={onClose} workspace={workspace} /> : <></>}
    </>
  );
};

export default WorkspaceSettings;
