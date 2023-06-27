export const REQUEST_TIMEOUT = 60 * 1000; // 请求超时时间
export const ERROR_MSG_DURATION = 3 * 1000; // 错误信息提示时长
export const DEFAULT_ERROR_CODE = 'DEFAULT';
export const DEFAULT_ERROR_MSG = '请求错误';
export const TIMEOUT_ERROR_CODE = 'ECONNABORTED';
export const TIMEOUT_ERROR_MSG = '请求超时';
export const NETWORK_ERROR_CODE = 'NETWORK_ERROR';
export const NETWORK_ERROR_MSG = '网络错误';
export const ERROR_STATUS = {
  400: '400: 错误的请求信息',
  401: '401: 未授权',
  403: '403: 禁止访问',
  404: '404: 请求的资源不存在',
  405: '405: 不被允许的请求方法',
  408: '408: 请求超时',
  500: '500: 服务器发生意外错误',
  501: '501: 暂未实现的请求',
  502: '502: 网关错误',
  503: '503: 服务不可用',
  504: '504: 网关超时',
  505: '505: 当前 HTTP 版本不支持该请求',
  [DEFAULT_ERROR_CODE]: DEFAULT_ERROR_MSG
};
export type ERROR_STATUS_CODE = keyof typeof ERROR_STATUS;
export const SILENT_ERROR_CODE: Array<number | string> = []; // 静默错误提示的 code 列表
