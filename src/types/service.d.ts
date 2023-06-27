declare namespace Service {
  type RequestMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';
  interface Specification {
    codeField: string; // 响应状态码字段
    dataField: string; // 响应数据字段
    msgField: string; // 响应信息字段
    successCode: number | string; // 业务层面响应成功状态码
  }
  /**
   * axios axios 相关错误，网络错误、请求超时、默认的兜底错误
   * http 请求成功，但是 http statusCode 非 200
   * logic 请求成功，响应 http statusCode 200，但是业务逻辑错误，接口返回业务状态码错误
   */
  type ErrorType = 'axios' | 'http' | 'logic';
  interface ErrorInfo {
    type: ErrorType; // 错误类型
    code: string | number; // 错误码
    msg: string; // 错误信息
  }
}
