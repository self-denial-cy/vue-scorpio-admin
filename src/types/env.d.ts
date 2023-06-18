/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_GAODE_SECURITY_CODE: string;
  readonly VITE_APP_GAODE_SDK_KEY: string;
  readonly VITE_APP_CRYPTO_SECRET: string;
  readonly VITE_APP_LOCAL_DEFAULT_CACHE_TIME: number;
}
