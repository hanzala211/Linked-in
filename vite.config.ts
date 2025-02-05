import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components/components.ts'),
      '@assets': path.resolve(__dirname, './src/assets/assets.ts'),
      '@pages': path.resolve(__dirname, './src/pages/pages.ts'),
      '@types': path.resolve(__dirname, 'src/types/types.ts'),
      '@context': path.resolve(__dirname, 'src/context/context.ts'),
      '@layouts': path.resolve(__dirname, 'src/layouts/layouts.ts'),
      '@services': path.resolve(__dirname, 'src/services/services.ts'),
      '@helpers': path.resolve(__dirname, 'src/helpers/helpers.ts'),
    }
  }
})