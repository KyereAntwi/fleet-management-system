import { useMutation } from '@tanstack/react-query';
import { CreateWorkspaceRequest } from '../../../models/workspaces/workspaceRequests';
import { createWorkspaceAsync } from '../../../services/workspaceServices';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

interface Props {
  displayOnError: (message: string) => void;
  displayOnProcessing: (message: string) => void;
}

export const createWorkspaceMutation = ({
  displayOnError,
  displayOnProcessing,
}: Props) => {
  const navigation = useNavigate();

  return useMutation({
    mutationFn: async (values: CreateWorkspaceRequest) => {
      const response = await createWorkspaceAsync(values);
      return response as BaseResponse<string>;
    },
    onMutate: () => {
      displayOnProcessing('Creating workspace...');
    },
    onSuccess: (response: BaseResponse<string>) => {
      if (response.success) {
        displayOnProcessing('');
        navigation(`/workspaces`);
      }
    },
    onError: (error: AxiosError<BaseResponse<string>>) => {
      displayOnError(error.response?.data.errors[0]!);
      displayOnProcessing('');
    },
  });
};
