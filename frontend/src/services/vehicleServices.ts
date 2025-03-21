import apiClient from "./ApiClient";
import {AddVehicleRequest, GetVehiclesRequest} from "../models/vehicles/vehicleRequests";

export const getWorkspaceVehiclesAsync = async (request: GetVehiclesRequest) => {
    const response = await apiClient.get(`/workspaces/${request.workspaceId}/vehicles`, {...request});
    return response.data;
}

export const addVehicleAsync = async (request: AddVehicleRequest) => {
    return await apiClient.post(`/workspaces/${request.workspaceId}/vehicles`, request);
}