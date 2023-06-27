import type { AxiosError } from 'axios';
import qs from 'qs';
import { ContentType } from '@/enum';
import { isFile, isArray } from '@/utils';
import {
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MSG,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  TIMEOUT_ERROR_CODE,
  TIMEOUT_ERROR_MSG,
  type ERROR_STATUS_CODE,
  ERROR_STATUS
} from './config';

/**
 * 策略模式
 * [状态, 为 true 时执行回调函数]
 */
type StrategyAction = [boolean, () => void];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformRequestData(data: any, contentType?: string) {
  let transformedData = data; // application/json 不处理
  if (contentType === ContentType.formUrlencoded) {
    transformedData = qs.stringify(data); // application/x-www-form-urlencoded 处理
  }
  if (contentType === ContentType.formData) {
    transformedData = transformFormData(data); // multipart/form-data 处理
  }
  return transformedData;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformFormData(data: Record<string, any>) {
  const formData = new FormData();
  const entries = Object.entries(data);
  entries.forEach(async ([key, value]) => {
    // 是否是单个文件或多文件列表
    const isFileType = isFile(value) || (isArray(value) && value.length && isFile(value[0]));
    if (isFileType) {
      transformFile(formData, key, value);
    } else {
      formData.append(key, value);
    }
  });
  return formData;
}

function transformFile(formData: FormData, key: string, value: File | File[]) {
  if (isArray(value)) {
    // 多文件
    (value as File[]).forEach((item) => {
      formData.append(key, item);
    });
  } else {
    // 单文件
    formData.append(key, value as File);
  }
}

export function transformAxiosError(axiosError: AxiosError) {
  const error: Service.ErrorInfo = {
    type: 'axios',
    code: DEFAULT_ERROR_CODE,
    msg: DEFAULT_ERROR_MSG
  };
  const actions: StrategyAction[] = [
    // 网络错误
    [
      !window.navigator.onLine || axiosError.message === 'Network Error',
      () => {
        Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG });
      }
    ],
    // 超时
    [
      axiosError.code === TIMEOUT_ERROR_CODE && axiosError.message.includes('timeout'),
      () => {
        Object.assign(error, { code: TIMEOUT_ERROR_CODE, msg: TIMEOUT_ERROR_MSG });
      }
    ],
    // HTTP 错误
    [
      !!axiosError.response,
      () => {
        const errorCode: ERROR_STATUS_CODE = (axiosError.response?.status as ERROR_STATUS_CODE) || 'DEFAULT';
        const msg = ERROR_STATUS[errorCode];
        Object.assign(error, { type: 'http', code: errorCode, msg });
      }
    ]
  ];
  execStrategyActions(actions);
}

function execStrategyActions(actions: StrategyAction[]) {
  actions.some(([bool, action]) => {
    if (bool) {
      action();
    }
    return bool;
  });
}
