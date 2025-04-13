import { CreateATenantRequest } from "../models/tenants/tenantRequests";
import apiClient from "./ApiClient";

export const getTenant = async () => {
  const response = await apiClient.get(`/tenants`);
  return response.data;
};

export const createTenantAsync = async (data: CreateATenantRequest) => {
  const response = await apiClient.post("/tenants", data);
  return response.data;
};
