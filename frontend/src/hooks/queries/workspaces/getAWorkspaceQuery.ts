import { useQuery } from "@tanstack/react-query";
import { getSingleWorkspaceAsync } from "../../../services/workspaceServices";
import { Workspace } from "../../../models/workspaces/workspace";
import {BaseResponse} from "../../../models/BaseResponse";

interface Props {
  id: string;
}

export const getAWorkspaceQuery = ({ id }: Props) => {
  return useQuery<BaseResponse<Workspace>, Error>({
    queryKey: ["getWorkspace", { id: id }],
    queryFn: async () => {
      const response = await getSingleWorkspaceAsync(id);
      return response as BaseResponse<Workspace>;
    },
  });
};
