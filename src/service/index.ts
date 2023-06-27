import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type ResponseEntry = keyof AxiosResponse;
type RequestConfig = {
  axios?: AxiosRequestConfig;
  entries: ResponseEntry[];
};

interface RequestParameter {
  url: string;
  method?: Service.RequestMethod;
  params?: Record<string, unknown>;
  data?: unknown;
  axiosConfig?: AxiosRequestConfig;
  entries: ResponseEntry[];
}

export function createService(axiosConfig: AxiosRequestConfig, specification: Service.Specification) {
  // TODO
}
