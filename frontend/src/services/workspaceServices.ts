import { CreateWorkspaceRequest } from '../models/workspaces/workspaceRequests';
import apiClient from './ApiClient';

export const createWorkspaceAsync = async (data: CreateWorkspaceRequest) => {
  const response = await apiClient.post('/workspaces', data);
  return response.data;
};

export const getWorkspacesAsync = async () => {
  const response = await apiClient.get('/workspaces');
  return response.data;
};
