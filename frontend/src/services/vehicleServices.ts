import apiClient from "./ApiClient";
import {
    AddVehicleRequest,
    GetVehiclesRequest,
    UpdateVehicleExpenditureRequest
} from "../models/vehicles/vehicleRequests";

export const getWorkspaceVehiclesAsync = async (request: GetVehiclesRequest) => {
    const response = await apiClient.get(`/workspaces/${request.workspaceId}/vehicles`, {...request});
    return response.data;
}

export const addVehicleAsync = async (request: AddVehicleRequest) => {
    return await apiClient.post(`/workspaces/${request.workspaceId}/vehicles`, request);
}

export const getVehicleDetailsAsync = async (vehicleId: string, workspaceId: string) => {
    const response = await apiClient.get(`/workspaces/${workspaceId}/vehicles/${vehicleId}`);
    return response.data;
}

export const updateVehicleExpenditureAsync = async (workspaceId: string, request: UpdateVehicleExpenditureRequest) => {
    return await apiClient.put(`/workspaces/${workspaceId}/vehicles/${request.vehicleId}/expenditure`, request);
}