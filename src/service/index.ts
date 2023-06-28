import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Service } from './instance';

type RequestConfig = {
  axios?: AxiosRequestConfig;
};

interface RequestParameter {
  url: string;
  method?: Service.RequestMethod;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  axiosConfig?: AxiosRequestConfig;
}

export function createService(axiosConfig: AxiosRequestConfig, specification: Service.Specification) {
  const service = new Service(axiosConfig, specification);

  async function asyncRequest<T>(parameter: RequestParameter): Promise<Service.ServiceResult<T>> {
    const { url, data, axiosConfig } = parameter;
    const method = parameter.method || 'get';
    const instance = service.getInstance();
    const res = (await request({
      instance,
      url,
      method,
      data,
      axiosConfig
    })) as Service.ServiceResult<T>;
    return res;
  }

  function _get_<T>(url: string, config?: RequestConfig) {
    return asyncRequest<T>({
      url,
      axiosConfig: config?.axios
    });
  }

  function _delete_<T>(url: string, config?: RequestConfig) {
    return asyncRequest<T>({
      url,
      method: 'delete',
      axiosConfig: config?.axios
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _post_<T>(url: string, data?: any, config?: RequestConfig) {
    return asyncRequest<T>({
      url,
      method: 'post',
      data,
      axiosConfig: config?.axios
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _put_<T>(url: string, data?: any, config?: RequestConfig) {
    return asyncRequest<T>({
      url,
      method: 'put',
      data,
      axiosConfig: config?.axios
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function _patch_<T>(url: string, data?: any, config?: RequestConfig) {
    return asyncRequest<T>({
      url,
      method: 'patch',
      data,
      axiosConfig: config?.axios
    });
  }

  return {
    get: _get_,
    delete: _delete_,
    post: _post_,
    put: _put_,
    patch: _patch_
  };
}

async function request(parameter: RequestParameter & { instance: AxiosInstance }) {
  const { instance, url, method, data, axiosConfig } = parameter;
  let res: AxiosResponse;
  if (method === 'get' || method === 'delete') {
    res = await instance[method](url, axiosConfig);
    return res.data;
  } else if (method === 'post' || method === 'put' || method === 'patch') {
    res = await instance[method](url, data, axiosConfig);
    return res.data;
  }
}
