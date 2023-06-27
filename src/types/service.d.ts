declare namespace Service {
  type RequestMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';
  interface Specification {
    codeField: string; // 响应状态码字段
    dataField: string; // 响应数据字段
    msgField: string; // 响应信息字段
    successCode: number | string; // 业务层面响应成功状态码
  }
}
