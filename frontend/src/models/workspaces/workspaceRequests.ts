export interface CreateWorkspaceRequest {
    title: string;
}

export interface UpdateWorkspaceRequest {
    workspaceId: string;
    title: string;
}