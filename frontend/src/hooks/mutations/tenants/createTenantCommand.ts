import { useMutation } from "@tanstack/react-query";
import { CreateATenantRequest } from "../../../models/tenants/tenantRequests";
import { createTenantAsync } from "../../../services/tenantsServices";
import { AxiosError } from "axios";

interface Props {
  createDefaultWorkspace: () => void;
  displayOnError: (message: string) => void;
  displayOnProcessing: (message: string) => void;
}

export const createTenantMutation = ({
  createDefaultWorkspace,
  displayOnError,
  displayOnProcessing,
}: Props) => {
  return useMutation({
    mutationFn: async (values: CreateATenantRequest) => {
      const response = await createTenantAsync(values);
      return response as BaseResponse<string>;
    },

    onMutate: () => {
      displayOnProcessing("Creating tenant...");
    },

    onSuccess: (response: BaseResponse<string>) => {
      if (response.success) {
        localStorage.setItem("tenantId", response.data!);
        createDefaultWorkspace();
        displayOnProcessing("");
      }
    },

    onError: (error: AxiosError<BaseResponse<string>>) => {
      displayOnError(error.response?.data.errors[0]!);
      displayOnProcessing("");
    },
  });
};
