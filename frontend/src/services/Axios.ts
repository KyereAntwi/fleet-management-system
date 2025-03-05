import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const config = {
    baseUrl: import.meta.env.VITE_REACT_APP_API_URL || "",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "X-Tenant-Id": localStorage.getItem("tenantId") || "",
    },
}

const {getAccessTokenSilently} = useAuth0();

export const getAxiosConfig = async () => {
    const token = await getAccessTokenSilently();

    if (token) {
        return({
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
    }

    return config;
}

const createAxiosInstance = async () => {
    const axiosConfig = await getAxiosConfig();
    const controller = new AbortController();
    return axios.create({
        ...axiosConfig,
        signal: controller.signal
    });
};

export default createAxiosInstance;
