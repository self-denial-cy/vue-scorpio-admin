import { fileURLToPath, URL } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

function resolve(src: string): string {
  return fileURLToPath(new URL(src, import.meta.url));
}

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'istanbul' // or 'v8'
      }
    }
  })
);
