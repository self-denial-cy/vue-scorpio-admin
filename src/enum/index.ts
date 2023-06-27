// Storage Key
export enum StorageKey {
  tabs = '__TABS__',
  token = '__TOKEN__',
  userInfo = '__USER_INFO__'
}

// 数据类型
export enum DataType {
  number = '[object Number]',
  string = '[object String]',
  boolean = '[object Boolean]',
  null = '[object Null]',
  undefined = '[object Undefined]',
  object = '[object Object]',
  array = '[object Array]',
  date = '[object Date]',
  regexp = '[object RegExp]',
  set = '[object Set]',
  map = '[object Map]',
  file = '[object File]',
  function = 'function'
}

// 角色枚举
export enum Role {
  super = '超级管理员',
  admin = '管理员',
  user = '普通用户'
}

// 请求头 Content-Type
export enum ContentType {
  json = 'application/json',
  formUrlencoded = 'application/x-www-form-urlencoded',
  formData = 'multipart/form-data'
}
