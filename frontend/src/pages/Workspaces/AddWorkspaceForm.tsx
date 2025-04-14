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
import {Workspace} from "../../models/workspaces/workspace";
import {useUpdateWorkspaceCommand} from "../../hooks/mutations/workspaces/useUpdateWorkspaceCommand";
import {z, ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormHelperText} from "@chakra-ui/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  workspace?: BaseResponse<Workspace>;
}

const formSchema: ZodType<CreateWorkspaceRequest> = z.object({
    title: z
        .string()
        .min(2, { message: 'Workspace title should not be less than 2 characters' })
        .max(200, { message: 'Workspace description should not be less than 200 characters' }),
})

const AddWorkspaceForm = ({ isOpen, onClose, workspace }: Props) => {
  const {register, handleSubmit, formState: { errors, isValid }} = useForm<CreateWorkspaceRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: workspace?.data?.workspaceTitle! ?? '',
    },
  });

  const createWorkspace = createWorkspaceMutation({
    displayOnError: (message) => console.log(message),
    displayOnProcessing: (message) => console.log(message),
    onSuccess: () => onClose(),
  });
  
  const updateWorkspace = useUpdateWorkspaceCommand({
    workspaceId: workspace?.id ?? '',
    onSuccess: () => onClose(),
  })

  const onSubmit: SubmitHandler<CreateWorkspaceRequest> = (data) => {
    if (workspace) {
      updateWorkspace.mutateAsync({
        workspaceId: workspace?.data?.id,
        title: data.title,
      })
    } else {
      createWorkspace.mutateAsync(data);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>{workspace ? `Update ${workspace?.data?.workspaceTitle}` : 'Create your workspace'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Workspace Title</FormLabel>
              <Input
                {...register("title")}
                placeholder="Workspace title here ..."
              />
              {errors?.title && <FormHelperText color={'red.500'}>{errors.title.message}</FormHelperText>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={createWorkspace.isPending || updateWorkspace.isPending}
              isDisabled={!isValid}
            >
              Save
            </Button>
            <Button onClick={onClose} isDisabled={createWorkspace.isPending || updateWorkspace.isPending}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddWorkspaceForm;
