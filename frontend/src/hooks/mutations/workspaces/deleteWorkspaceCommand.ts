import { useMutation } from '@tanstack/react-query';
import { deleteWorkspaceAsync } from '../../../services/workspaceServices';
import Swal from 'sweetalert2';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import {BaseResponse} from "../../../models/BaseResponse";

export const deleteWorkspaceCommand = () => {
  const toast = useToast();
  const navigation = useNavigate();

  return useMutation({
    mutationFn: async (id: string) => {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this workspace?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          return deleteWorkspaceAsync(id).then(() => {
            toast({
              title: `Workspace was deleted successfully`,
              status: 'success',
              isClosable: true,
            });

            navigation('/workspaces');
          });
        } else if (result.isDenied) {
          return;
        }
      });
    },

    onError: (error: AxiosError<BaseResponse<string>>) => {
      toast({
        title: `Error deleting workspace. Error ${
          error.response?.data.errors[0] || error.message
        }`,
        status: 'error',
        isClosable: true,
      });
    },
  });
};
