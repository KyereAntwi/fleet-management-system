import axios from "axios";

const config = {
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || "",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "X-Tenant-Id": localStorage.getItem("tenantId") || "",
  },
};

const getAxiosConfig = async () => {
  const token = localStorage.getItem("token") || "";

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
  }

  return config;
};

const createAxiosInstance = async () => {
  const axiosConfig = await getAxiosConfig();
  const controller = new AbortController();
  return axios.create({
    ...axiosConfig,
    signal: controller.signal,
  });
};

export default createAxiosInstance;
