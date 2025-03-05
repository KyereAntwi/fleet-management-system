import { useMutation } from "@tanstack/react-query";
import { CreateATenantRequest } from "../../../models/tenants/tenantRequests";
import { createTenantAsync } from "../../../services/tenantsServices";

interface Props {
  createDefaultWorkspace: () => void;
  displayOnError: (message: string) => void;
}

export const createTenantMutation = ({
  createDefaultWorkspace,
  displayOnError,
}: Props) => {
  return useMutation({
    mutationFn: async (values: CreateATenantRequest) => {
      const response = await createTenantAsync(values);
      return response as BaseResponse<string>;
    },

    onSuccess: (response: BaseResponse<string>) => {
      if (response.success) {
        localStorage.setItem("tenantId", response.data!);
        createDefaultWorkspace();
      }
    },

    onError: (error) => {
      displayOnError(error.message);
    },
  });
};
