import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateWorkspaceRequest } from '../../../models/workspaces/workspaceRequests';
import { createWorkspaceAsync } from '../../../services/workspaceServices';
import { AxiosError } from 'axios';
import {BaseResponse} from "../../../models/BaseResponse";

interface Props {
  displayOnError: (message: string) => void;
  displayOnProcessing: (message: string) => void;
  onSuccess?: () => void;
}

export const createWorkspaceMutation = ({
  displayOnError,
  displayOnProcessing,
  onSuccess,
}: Props) => {
  const queryClient = useQueryClient();

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

        queryClient.invalidateQueries({ queryKey: ['workspaces'] });

        if (onSuccess) {
          onSuccess();
        }
      }
    },
    onError: (error: AxiosError<BaseResponse<string>>) => {
      displayOnError(error.response?.data.errors[0]!);
      displayOnProcessing('');
    },
  });
};
