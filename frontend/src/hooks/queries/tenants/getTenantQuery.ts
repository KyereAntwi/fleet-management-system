import { useQuery } from "@tanstack/react-query";
import { Tenant } from "../../../models/tenants/tenant";
import { getTenant } from "../../../services/tenantsServices";

interface Props {
  userId: string;
}

const getTenantQuery = ({ userId }: Props) => {
  return useQuery<BaseResponse<Tenant>, Error>({
    queryKey: ["tenant"],
    queryFn: async () => {
      const response = await getTenant(userId);
      return response as BaseResponse<Tenant>;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default getTenantQuery;
