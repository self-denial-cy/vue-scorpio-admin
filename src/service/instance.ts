import axios from 'axios';
import type { AxiosError, AxiosRequestHeaders, AxiosInstance, AxiosRequestConfig } from 'axios';

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
    this.instance.interceptors.request.use(async (config) => {
      const contentType = config.headers.get('Content-Type') as string;
      if (config.data) {
        // TODO
      }
      return config;
    });
  }

  getInstance() {
    return this.instance;
  }

  getSpecification() {
    return this.specification;
  }
}
