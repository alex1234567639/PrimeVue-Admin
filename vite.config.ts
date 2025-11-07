import path from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { PrimeVueResolver } = await import('@primevue/auto-import-resolver');

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    optimizeDeps: {
      noDiscovery: true
    },
    plugins: [
      vue(),
      svgLoader(),
      /**
       * unplugin-auto-import Setting
       * https://github.com/antfu/unplugin-auto-import
       * 自動 import 常用 API（如 vue / vue-router / pinia…）
       * 設定後要先 pnpm run dev 產生 eslintrc-auto-import.json, auto-imports.d.ts
       * tsconfig.json 也要設定 include auto-imports.d.ts"
       */
      AutoImport({
        // 1. 指定要自動 import 的 API
        imports: [
          'vue',
          'vue-router',
          {
            // 若有其他套件也可引入
            '@vueuse/core': ['useMouse', 'useEventListener']
          }
        ],

        // 2. 產生到根目錄，讓 ESLint 可以讀到
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: 'readonly'
        },

        // 3. 產生 TS 聲明檔
        dts: 'auto-imports.d.ts'
      }),

      /**
       * 自動註冊 src/components 底下的 .vue 元件
       * 設定後要先 pnpm run dev 產生 components.d.ts\
       * tsconfig.json 也要設定 include components.d.ts"
       */
      Components({
        resolvers: [PrimeVueResolver()],
        dirs: ['src/components'],
        extensions: ['vue'],
        deep: true,
        dts: 'components.d.ts' // 產生類型定義檔
      })
    ]
  };
});
