import { create } from 'zustand';
import { Workspace } from '../models/workspaces/workspace';

interface Props {
  workspace?: Workspace;
  setSelectedWorkspace: (workspace: Workspace) => void;
}

const useSelectedWorkspaceStore = create<Props>()((set) => ({
  workspace: undefined,
  setSelectedWorkspace: (workspace: Workspace) =>
    set((state) => ({ workspace: { ...workspace } })),
}));

export default useSelectedWorkspaceStore;
