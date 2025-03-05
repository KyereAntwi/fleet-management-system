import { CreateATenantRequest } from "../models/tenants/tenantRequests";
import apiClient from "./ApiClient";

export const getTenant = async (userId: string) => {
  const response = await apiClient.get(`/tenants/${userId}`);
  return response.data;
};

export const createTenantAsync = async (data: CreateATenantRequest) => {
  const response = await apiClient.post("/tenants", data);
  return response.data;
};
