import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'

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
        index: resolve(__dirname, 'pages/index.html'),
        about: resolve(__dirname, 'pages/about.html'),
        'design-system': resolve(__dirname, 'pages/design-system.html')
      },
      // 自訂輸出配置
      output: {
        // JS 檔案輸出配置
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

  // 設定 base 路徑：開發時用相對路徑，GitHub Pages 用專案名稱
  base: process.env.NODE_ENV === 'production' ? '/case-template/' : './',

  // CSS 配置
  css: {
    preprocessorOptions: {
      scss: {
        // 使用現代 Sass 語法，解決棄用警告
        silenceDeprecations: ["legacy-js-api", "color-functions", "import", "global-builtin"],
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
  publicDir: 'public',
  
  // 設定根目錄
  root: 'src',

  // 插件配置
  plugins: [
    // 自訂插件來移動 HTML 檔案到根目錄
    {
      name: 'move-html-to-root',
      writeBundle(options, bundle) {
        // 移動 HTML 檔案到根目錄
        Object.keys(bundle).forEach(key => {
          if (key.endsWith('.html')) {
            const sourcePath = path.join(options.dir, key);
            const targetPath = path.join(options.dir, path.basename(key));
            
            if (sourcePath !== targetPath && fs.existsSync(sourcePath)) {
              fs.renameSync(sourcePath, targetPath);
              
              // 清理空的資料夾
              const sourceDir = path.dirname(sourcePath);
              if (fs.existsSync(sourceDir) && fs.readdirSync(sourceDir).length === 0) {
                fs.rmdirSync(sourceDir, { recursive: true });
              }
            }
          }
        });
      }
    }
  ]
})