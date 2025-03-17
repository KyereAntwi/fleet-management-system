import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateWorkspaceRequest } from "../../models/workspaces/workspaceRequests";
import { createWorkspaceMutation } from "../../hooks/mutations/workspaces/createWorkspaceCommand";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddWorkspaceForm = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceRequest>();

  const createWorkspace = createWorkspaceMutation({
    displayOnError: (message) => console.log(message),
    displayOnProcessing: (message) => console.log(message),
    onSuccess: () => onClose(),
  });

  const onSubmit: SubmitHandler<CreateWorkspaceRequest> = (data) => {
    createWorkspace.mutateAsync(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Create your workspace</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Workspace Title</FormLabel>
              <Input
                {...register("title")}
                placeholder="Workspace title here ..."
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={createWorkspace.isPending}
            >
              Save
            </Button>
            <Button onClick={onClose} isDisabled={createWorkspace.isPending}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddWorkspaceForm;
