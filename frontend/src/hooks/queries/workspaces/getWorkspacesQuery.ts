import { useQuery } from '@tanstack/react-query';
import {Workspace} from "../../../models/workspaces/workspace";
import {getWorkspacesAsync} from '../../../services/workspaceServices';

const getWorkspacesQuery = () => {
    return useQuery<BaseResponse<Workspace[]>, Error>({
        queryKey: ['workspaces'],
        queryFn: async () => {
            const response = await getWorkspacesAsync();
            return response as BaseResponse<Workspace[]>;
        }
    })
}

export default getWorkspacesQuery;