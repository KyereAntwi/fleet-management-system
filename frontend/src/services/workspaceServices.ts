import {CreateWorkspaceRequest, UpdateWorkspaceRequest} from '../models/workspaces/workspaceRequests';
import apiClient from './ApiClient';

export const createWorkspaceAsync = async (data: CreateWorkspaceRequest) => {
  const response = await apiClient.post('/workspaces', data);
  return response.data;
};

export const getWorkspacesAsync = async () => {
  const response = await apiClient.get('/workspaces');
  return response.data;
};

export const getSingleWorkspaceAsync = async (id: string) => {
  const response = await apiClient.get(`/workspaces/${id}`);
  return response.data;
};

export const deleteWorkspaceAsync = async (id: string) => {
  return await apiClient.delete(`/workspaces/${id}`);
};

export const updateWorkspaceAsync = async (data: UpdateWorkspaceRequest) => {
  return await apiClient.put(`/workspaces/${data.workspaceId}`, data);
}
