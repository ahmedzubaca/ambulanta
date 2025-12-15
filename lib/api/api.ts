import { apiClient } from './api-client';

export const api = {
  get: <T>(url: string, params?: object) =>
    apiClient.get<T>(url, { params }).then(res => res.data),

  post: <T>(url: string, data?: unknown) =>
    apiClient.post<T>(url, data).then(res => res.data),

  put: <T>(url: string, data?: unknown) =>
    apiClient.put<T>(url, data).then(res => res.data),

  delete: <T>(url: string) =>
    apiClient.delete<T>(url).then(res => res.data),
};