import { encrypt, decrypt } from '@/utils';

interface StorageData {
  value: unknown;
  expired: number | null;
}

// TODO 默认缓存期限修改为可配置
const DEFAULT_CACHE_TIME = 7 * 24 * 60 * 60; // 7 天

export function setLocal(key: string, value: unknown, expired: number | null = DEFAULT_CACHE_TIME) {
  const storageData: StorageData = {
    value,
    expired: expired !== null ? Date.now() + expired * 1000 : null
  };
  window.localStorage.setItem(key, encrypt(storageData));
}

export function getLocal<T>(key: string) {
  const val = window.localStorage.getItem(key);
  if (!val) return null;
  let storageData: StorageData | null = null;
  try {
    storageData = decrypt(val);
  } catch {
    // 防止解密失败
  }
  if (storageData) {
    const { value, expired } = storageData;
    if (expired === null || Date.now() <= expired) {
      return value as T;
    }
  }
  removeLocal(key); // 解密失败的和过期的都清掉
  return null;
}

export function removeLocal(key: string) {
  window.localStorage.removeItem(key);
}

export function clearLocal() {
  window.localStorage.clear();
}
