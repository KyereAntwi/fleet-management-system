import {AxiosError, AxiosResponse} from 'axios';
import createAxiosInstance from './Axios';

export type ErrorResponse = AxiosError<BaseResponse<string>>;

const axiosInstance = await createAxiosInstance();

axiosInstance.interceptors.response.use((config) => {
  config.headers['X-Tenant-Id'] = localStorage.getItem('tenantId') || '';
  return config;
});

const apiClient = {
  async get<TRequest, TResponse>(
    url: string,
    data?: TRequest
  ): Promise<AxiosResponse<BaseResponse<TResponse>>> {
    return await axiosInstance.get<BaseResponse<TResponse>>(url, {
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
