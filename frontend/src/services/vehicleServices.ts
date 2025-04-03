import apiClient from "./ApiClient";
import {
    AddVehicleRequest,
    GetVehiclesRequest,
    UpdateVehicleExpenditureRequest, VehicleExpenditureType
} from "../models/vehicles/vehicleRequests";

export const getWorkspaceVehiclesAsync = async (request: GetVehiclesRequest) => {
    const response = await apiClient.get(`/workspaces/${request.workspaceId}/vehicles`, {...request});
    return response.data;
}

export const addVehicleAsync = async (request: AddVehicleRequest) => {
    return await apiClient.post(`/workspaces/${request.workspaceId}/vehicles`, request);
}

export const addBulkVehicleAsync = async (workspaceId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('WorkspaceId', workspaceId);

    return await apiClient.post(`/workspaces/${workspaceId}/vehicles/bulk`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const getVehicleDetailsAsync = async (vehicleId: string, workspaceId: string) => {
    const response = await apiClient.get(`/workspaces/${workspaceId}/vehicles/${vehicleId}`);
    return response.data;
}

export const updateVehicleExpenditureAsync = async (workspaceId: string, request: UpdateVehicleExpenditureRequest) => {
    return await apiClient.put(`/workspaces/${workspaceId}/vehicles/${request.vehicleId}/expenditure`, request);
}

export const deleteVehicleAsync = async (workspaceId: string, vehicleId: string) => {
    return await apiClient.delete(`/workspaces/${workspaceId}/vehicles/${vehicleId}`);
}

export const removeConsumptionCostAsync = async (workspaceId: string, vehicleId: string, id: string, expenditureType: VehicleExpenditureType) => {
    return await apiClient.delete(`/workspaces/${workspaceId}/vehicles/${vehicleId}/expenditure/${id}?type=${expenditureType}`,)
}