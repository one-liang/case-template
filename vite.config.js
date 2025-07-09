import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // 開發伺服器配置
  server: {
    port: 3000,
    open: true,
    host: true
  },

  // 建置配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 保持檔案未壓縮 (符合規範要求)
    minify: false,
    rollupOptions: {
      input: {
        // 多頁應用入口點
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        products: resolve(__dirname, 'products.html'),
        components: resolve(__dirname, 'components.html'),
        'design-system': resolve(__dirname, 'design-system.html')
      },
      output: {
        // 保持清晰的檔案命名
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name][extname]`;
          }
          if (extType === 'css') {
            return `assets/css/[name][extname]`;
          }
          return `assets/[name][extname]`;
        }
      }
    }
  },

  // CSS 配置
  css: {
    preprocessorOptions: {
      scss: {
        // 使用現代 Sass 語法，解決棄用警告
        silenceDeprecations: ["legacy-js-api"],
        api: "modern-compiler",
        // 添加 includePaths 來解析 node_modules
        includePaths: ['node_modules']
      }
    },
    devSourcemap: true
  },

  // 路徑解析
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@assets': resolve(__dirname, './assets'),
      '@components': resolve(__dirname, './components'),
      '@pages': resolve(__dirname, './pages')
    }
  },

  // 靜態資源處理
  publicDir: 'src/public',

  // 插件配置
  plugins: []
})