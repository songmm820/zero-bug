import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // 获取.env文件里定义的环境变量
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    base: env.VITE_SECOND_DEPLOY_DIR,
    plugins: [react(), tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {}
      }
    },
    // 1. prevent vite from obscuring rust errors 防止 Vite 清除 Rust 显示的错误
    clearScreen: false,
    server: {
      port: 1420,
      strictPort: true,
      proxy: {
        // whyApi
        '/whyApi': {
          target: env.VITE_WHY_API_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/whyApi/, ''),
          headers: {
            'Cache-Control': 'no-cache'
          }
        }
      }
    },
    // 3. // 添加有关当前构建目标的额外前缀，使这些 CLI 设置的 Tauri 环境变量可以在客户端代码中访问
    envPrefix: ['VITE_'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      minify: true, // 是否打包压缩
      emptyOutDir: true, // 构建时清空该目录
      chunkSizeWarningLimit: 2000, // 触发打包警告阈值
      cssCodeSplit: true, // css 分离
      // 配置 rollup 打包选项
      rollupOptions: {
        output: {
          // 静态资源分类打包
          entryFileNames: 'js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: '[ext]/[name].[hash].[ext]', // 用于输出静态资源的命名，[ext]表示文件扩展名
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  })
}
