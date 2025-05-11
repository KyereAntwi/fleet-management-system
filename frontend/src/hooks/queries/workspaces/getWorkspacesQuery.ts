import { useQuery } from '@tanstack/react-query';
import { Workspace } from '../../../models/workspaces/workspace';
import { getWorkspacesAsync } from '../../../services/workspaceServices';
import {BaseResponse} from "../../../models/BaseResponse";

const getWorkspacesQuery = (load: boolean) => {
  return useQuery<BaseResponse<Workspace[]>, Error>({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await getWorkspacesAsync();
      return response as BaseResponse<Workspace[]>;
    },
    enabled: load,
  });
};

export default getWorkspacesQuery;
