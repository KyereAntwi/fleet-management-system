import apiClient from "./ApiClient";
import {GetVehiclesRequest} from "../models/vehicles/vehicleRequests";

export const getWorkspaceVehiclesAsync = async (request: GetVehiclesRequest) => {
    const response = await apiClient.get(`/workspaces/${request.workspaceId}/vehicles`, {...request});
    return response.data;
}