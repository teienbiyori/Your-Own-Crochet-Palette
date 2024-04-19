import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 将服务器绑定到所有网络接口，以便容器外部可以访问
    port: 5173 // 指定服务器监听的端口
  }
})
