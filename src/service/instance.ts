import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { transformRequestData } from './utils';
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
        // TODO
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
