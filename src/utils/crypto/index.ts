import CryptoJS from 'crypto-js';

const CryptoSecret = import.meta.env.VITE_APP_CRYPTO_SECRET;

// 数据加密
export function encrypt(data: unknown) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoSecret).toString();
}

// 数据解密
export function decrypt(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoSecret);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  if (!decryptedData) return null;
  return JSON.parse(decryptedData);
}
