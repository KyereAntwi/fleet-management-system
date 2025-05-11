import {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import createAxiosInstance from './Axios';
import {BaseResponse} from '../models/BaseResponse';

export type ErrorResponse = AxiosError<BaseResponse<string>>;

let axiosInstance: AxiosInstance;

async function initializeAxios() {
  axiosInstance = await createAxiosInstance()

  axiosInstance.interceptors.response.use((config) => {
    config.headers['X-Tenant-Id'] = localStorage.getItem('tenantId') || '';
    return config;
  });
}

initializeAxios();

const apiClient = {
  async get<TRequest, TResponse>(
    url: string,
    data?: TRequest
  ): Promise<AxiosResponse<BaseResponse<TResponse>>> {
    return axiosInstance.get<BaseResponse<TResponse>>(url, {
      method: 'GET',
    });
  },

  async post<TRequest, TResponse>(
    url: string,
    data: TRequest,
    options?: Object
  ): Promise<AxiosResponse<BaseResponse<TResponse>>> {
    return await axiosInstance.post<BaseResponse<TResponse>>(
      url,
      data,
      options ?? {
        method: 'POST',
      }
    );
  },

  async put<TRequest, TResponse>(
    url: string,
    data: TRequest,
    options?: Object
  ): Promise<AxiosResponse<BaseResponse<TResponse>>> {
    return await axiosInstance.put<BaseResponse<TResponse>>(
      url,
      data,
      options ?? {
        method: 'PUT',
      }
    );
  },

  async delete<T>(url: string): Promise<AxiosResponse<BaseResponse<T>>> {
    return await axiosInstance.delete<BaseResponse<T>>(url, {
      method: 'DELETE',
    });
  },
};

export default apiClient;
