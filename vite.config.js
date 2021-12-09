/*
 * @page: 
 * @Author: Orts
 * @Date: 2021-12-09 09:37:00
 * @LastEditTime: 2021-12-09 17:04:09
 * @LastEditors: Orts
 * @Description: 
 * @FilePath: /xlsx-in-vue3/vite.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      },
      less: {
        charset: false,
      },
    },
    charset: false,
    postcss: {
      plugins: [{
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
          charset: (atRule) => {
            if (atRule.name === 'charset') {
              atRule.remove();
            }
          }
        }
      }],
    },
  },
  build: {
    chunkSizeWarningLimit:2000,
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash'],
          elementPlus: ['element-plus'],
          xlsx: ['xlsx'],
          xDataSpreadsheet: ['x-data-spreadsheet']
        }
      }
    }
  }
})