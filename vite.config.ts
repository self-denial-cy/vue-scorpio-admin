import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import ReactivityTransform from '@vue-macros/reactivity-transform/vite';
import AutoImport from 'unplugin-auto-import/vite';
import VueComponents from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import IconsResolver from 'unplugin-icons/resolver';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Autoprefixer from 'autoprefixer';
import PostcssPxtorem from 'postcss-pxtorem';
import UnoCss from 'unocss/vite';
import { viteMockServe } from 'vite-plugin-mock';

function resolve(src: string): string {
  return fileURLToPath(new URL(src, import.meta.url));
}

export default defineConfig({
  plugins: [
    Vue(),
    // API 自动按需导入
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', 'vue/macros'],
      dts: resolve('./src/types/auto-imports.d.ts'),
      eslintrc: {
        enabled: true, // 更新了 unplugin-auto-import 导入配置后，设置为 true，重新生成一份 eslint globals 再关闭即可
        filepath: resolve('./.eslintrc-auto-import.json'),
        globalsPropValue: true
      },
      resolvers: [ElementPlusResolver()]
    }),
    // 组件自动按需导入
    VueComponents({
      dts: resolve('./src/types/vue-components.d.ts'),
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        IconsResolver({
          prefix: 'i',
          alias: {
            // 给图标集配置别名
            l: 'local'
          },
          customCollections: ['local']
        })
      ]
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      customCollections: {
        // local 图标集，给 svg 文件设置 fill="currentColor" 属性，使图标颜色可适应【对 svg 格式有要求，有的 svg 内部写死了颜色】
        // local: FileSystemIconLoader(resolve('./src/assets/icons'), (svg) =>
        //   svg.replace(/^<svg /, '<svg fill="currentColor" ')
        local: FileSystemIconLoader(resolve('./src/assets/icons'))
      },
      scale: 1
    }),
    // 雪碧图
    createSvgIconsPlugin({
      iconDirs: [resolve('./src/assets/icons')]
    }),
    // 响应性语法糖
    ReactivityTransform(),
    // unocss 原子化
    UnoCss(),
    viteMockServe({
      ignore: /^_/,
      mockPath: 'mock',
      localEnabled: true,
      prodEnabled: true,
      injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer';
        setupProdMockServer();
      `
    })
  ],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/scss/overwrite/index.scss' as *;`
      }
    },
    postcss: {
      plugins: [
        Autoprefixer(),
        PostcssPxtorem({
          rootValue: 192,
          unitPrecision: 5,
          propList: ['*', '!border']
        })
      ]
    }
  },
  build: {
    outDir: 'docs'
  }
});
