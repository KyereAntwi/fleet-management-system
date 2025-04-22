import { useQuery } from "@tanstack/react-query";
import { Tenant } from "../../../models/tenants/tenant";
import { getTenant } from "../../../services/tenantsServices";
import {BaseResponse} from "../../../models/BaseResponse";

const getTenantQuery = () => {
  return useQuery<BaseResponse<Tenant>, Error>({
    queryKey: ["tenant"],
    queryFn: async () => {
      const response = await getTenant();
      return response as BaseResponse<Tenant>;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default getTenantQuery;
