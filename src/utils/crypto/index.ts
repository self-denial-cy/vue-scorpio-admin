import CryptoJS from 'crypto-js';

// TODO 修改成可配置的 Secret
const CryptoSecret = '__Crypto_Secret__';

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
