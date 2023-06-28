import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  transformRequestData,
  transformAxiosError,
  transformServiceResult,
  transformLogicError,
  transformResponseError
} from './utils';
import { getToken } from '@/helpers';
export class Service {
  private instance: AxiosInstance;
  private specification: Service.Specification;

  constructor(
    axiosConfig: AxiosRequestConfig,
    specification: Service.Specification = {
      codeField: 'code',
      dataField: 'data',
      msgField: 'msg',
      successCode: 200
    }
  ) {
    this.instance = axios.create(axiosConfig);
    this.specification = specification;
    this.setInterceptor();
  }

  // 设置拦截器
  private setInterceptor() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const contentType = config.headers.get('Content-Type') as string;
        if (config.data) {
          config.data = transformRequestData(config.data, contentType);
        }
        config.headers.setAuthorization(getToken()); // 登录凭证
        return config;
      },
      (axiosError: AxiosError) => {
        const error = transformAxiosError(axiosError);
        return transformServiceResult(error, null);
      }
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const { status } = response;
        if (status === 200 || status < 300 || status === 304) {
          // HTTP 状态成功
          const { data } = response;
          const { codeField, dataField, successCode } = this.specification;
          if (data[codeField] === successCode) {
            // 业务成功
            response.data = transformServiceResult(null, data[dataField]);
          } else {
            // 业务失败
            const error = transformLogicError(data, this.specification);
            response.data = transformServiceResult(error, null);
          }
        } else {
          // HTTP 状态失败
          const error = transformResponseError(response);
          response.data = transformServiceResult(error, null);
        }
        return response;
      },
      (axiosError: AxiosError) => {
        const error = transformAxiosError(axiosError);
        return transformServiceResult(error, null);
      }
    );
  }

  getInstance() {
    return this.instance;
  }

  getSpecification() {
    return this.specification;
  }
}
