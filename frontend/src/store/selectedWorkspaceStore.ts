import { create } from 'zustand';
import { Workspace } from '../models/workspaces/workspace';

export interface SelectedStoreProps {
  workspace?: Workspace;
  setSelectedWorkspace: (workspace: Workspace) => void;
  resetSelectedWorkspace: () => void;
}

const useSelectedWorkspaceStore = create<SelectedStoreProps>()((set) => ({
  workspace: undefined,
  setSelectedWorkspace: (workspace: Workspace) => set((state) => ({ workspace: { ...workspace } })),
  resetSelectedWorkspace: () => set((state) => ({workspace: undefined}))
}));

export default useSelectedWorkspaceStore;