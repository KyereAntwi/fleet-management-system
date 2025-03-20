import {
  Button,
  Divider,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  useDisclosure,
} from '@chakra-ui/react';
import getWorkspacesQuery from '../../hooks/queries/workspaces/getWorkspacesQuery';
import FullPageLoading from '../../components/UI/FullPageLoading';
import Error, { ErrorTypes } from '../../components/UI/Error';
import { useNavigate } from 'react-router';
import WorkspaceItem from './WorkspaceItem';
import AddWorkspaceForm from './AddWorkspaceForm';

export default function Workspaces() {
  const { data, isLoading, isError, error } = getWorkspacesQuery(true);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return (
      <HStack w={'80%'} mx={'auto'} justifyContent={'space-between'}>
        <Error message={error?.message} type={ErrorTypes.SERVER} />
      </HStack>
    );
  }

  if (data?.data?.length === 0) {
    navigate('/get-started');
  }

  return (
    <>
      <HStack
        as={'section'}
        w={'80%'}
        justifyContent={'right'}
        mx={'auto'}
        my={5}
      >
        <Button
          variant={'solid'}
          size={{
            base: 'sm',
            md: 'md',
          }}
          bg={'teal.400'}
          color={'white'}
          onClick={onOpen}
        >
          Create a new workspace
        </Button>
      </HStack>

      <Divider my={3} />

      <TableContainer as={'section'} w={'80%'} mx={'auto'}>
        <Table variant={'simple'}>
          <Tbody>
            {data &&
              data.data?.map((workspace) => (
                <WorkspaceItem key={workspace.id} workspace={workspace} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AddWorkspaceForm isOpen={isOpen} onClose={onClose} />
    </>
  );
}
