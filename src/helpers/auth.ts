import { StorageKey } from '@/enum';
import { getLocal, setLocal, removeLocal } from '@/utils';

// 缓存 token
export function setToken(token: string) {
  setLocal(StorageKey['token'], token);
}

// 读取 token
export function getToken() {
  return getLocal<string>(StorageKey['token']) || '';
}

// 删除 token
export function removeToken() {
  removeLocal(StorageKey['token']);
}

// 读取用户信息
export function getUserInfo() {
  const defaultUserInfo: UserInfo = {
    id: '666',
    name: '默认用户',
    role: 'super'
  };
  const userInfo = getLocal<UserInfo>(StorageKey['userInfo']) || defaultUserInfo;
  return userInfo;
}

// 缓存用户信息
export function setUserInfo(userInfo: UserInfo) {
  setLocal(StorageKey['userInfo'], userInfo);
}

// 删除用户信息
export function removeUserInfo() {
  removeLocal(StorageKey['userInfo']);
}
