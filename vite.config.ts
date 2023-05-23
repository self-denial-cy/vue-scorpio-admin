import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    autoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: fileURLToPath(new URL('./src/types/auto-imports.d.ts', import.meta.url)),
      eslintrc: {
        enabled: true, // 更新了 unplugin-auto-import 导入配置后，设置为 true，重新生成一份 eslint globals 再关闭即可
        filepath: fileURLToPath(new URL('./.eslintrc-auto-import.json', import.meta.url)),
        globalsPropValue: true
      },
      resolvers: [ElementPlusResolver()]
    }),
    vueComponents({
      dts: fileURLToPath(new URL('./src/types/vue-components.d.ts', import.meta.url)),
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
