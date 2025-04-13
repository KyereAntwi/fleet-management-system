import apiClient from "./ApiClient";
import {
    AddVehicleRequest,
    GetVehiclesRequest,
    UpdateVehicleExpenditureRequest, UpdateVehicleRequest, VehicleExpenditureType
} from "../models/vehicles/vehicleRequests";

export const getWorkspaceVehiclesAsync = async (request: GetVehiclesRequest) => {
    const response = await apiClient.get(`/workspaces/${request.workspaceId}/vehicles`, {...request});
    return response.data;
}

export const addVehicleAsync = async (request: AddVehicleRequest) => {
    return await apiClient.post(`/workspaces/${request.workspaceId}/vehicles`, request);
}

export const updateVehicleAsync = async (request: UpdateVehicleRequest) => {
    return await apiClient.put(`/workspaces/${request.workspaceId}/vehicles/${request.vehicleId}`, request);
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

export const getVehiclesDueForRoadworthyRenewalsPerWorkspaceAsync = async (workspaceId: string, period?: string) => {
    const response =  await apiClient.get(`/workspaces/${workspaceId}/reports/roadworthy-renewals?Period=${period || ''}`);
    return response.data;
};

export const getVehiclesDueForInsuranceRenewalsPerWorkspaceAsync = async (workspaceId: string, period?: string) => {
    const response =  await apiClient.get(`/workspaces/${workspaceId}/reports/insurance-renewals?Period=${period || ''}`);
    return response.data;
}

export const getTotalCostOfFleetsAsync = async (
    workspaceId: string,
    FromDate: string,
    ToDate: string) => {
    const response = await 
        apiClient.get(`/workspaces/${workspaceId}/reports/total-cost-of-fleets?fromDate=${FromDate}&toDate=${ToDate}`);
    return response.data;
}

export const getTotalNumberOfFleetsAsync = async (
    workspaceId: string,
    FromDate: string,
    ToDate: string) => {
    const response = await 
        apiClient.get(`/workspaces/${workspaceId}/reports/number-of-vehicles?fromDate=${FromDate}&toDate=${ToDate}`);
    return response.data;
}

export const getTotalCostOfAccidentRepairsAsync = async (
    workspaceId: string,
    FromDate: string,
    ToDate: string
) => {
    const response = await 
        apiClient.get(`/workspaces/${workspaceId}/reports/total-cost-of-accident-repairs?fromDate=${FromDate}&toDate=${ToDate}`);
    return response.data;
}

export const getTotalCostOfFuelConsumedAsync = async (
    workspaceId: string,
    FromDate: string,
    ToDate: string
) => {
    const response = await
        apiClient.get(`/workspaces/${workspaceId}/reports/total-cost-of-fuel-consumed?fromDate=${FromDate}&toDate=${ToDate}`);
    return response.data;
}

export const getTotalCostOfMaintenanceAsync = async (
    workspaceId: string,
    FromDate: string,
    ToDate: string
) => {
    const response = await
        apiClient.get(`/workspaces/${workspaceId}/reports/total-cost-of-maintenance?fromDate=${FromDate}&toDate=${ToDate}`);
    return response.data;
}