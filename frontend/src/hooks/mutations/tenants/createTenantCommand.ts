import { useMutation } from "@tanstack/react-query";
import { CreateATenantRequest } from "../../../models/tenants/tenantRequests";
import { createTenantAsync } from "../../../services/tenantsServices";

interface Props {
  createDefaultWorkspace: () => void;
}

export const createTenantMutation = ({ createDefaultWorkspace }: Props) => {
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
      console.error(error);
    },
  });
};
