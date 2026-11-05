import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// Tailwind 4 用 CLI standalone 构建，不用 @tailwindcss/vite 插件
// 构建前运行: npx @tailwindcss/cli -i src/style.css -o src/tailwind.css

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
