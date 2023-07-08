import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, './src')},
      { find: "@public", replacement: path.resolve(__dirname, './public')},
      { find: "@utils", replacement: path.resolve(__dirname, './src/utils')},
      { find: "@components", replacement: path.resolve(__dirname, './src/components')},
      { find: "@contexts", replacement: path.resolve(__dirname, './src/contexts')},
      { find: "@models", replacement: path.resolve(__dirname, './src/models')},
      { find: "@pages", replacement: path.resolve(__dirname, './src/pages')},
      { find: "@hooks", replacement: path.resolve(__dirname, './src/hooks')}
    ]
  },
  optimizeDeps: {
    include: ['@emotion/styled'],
  }
})
