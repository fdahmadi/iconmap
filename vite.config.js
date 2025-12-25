import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/icons-material': path.resolve(__dirname, './src/icons-mapping.jsx'),
      '@mui/icons-material-original': path.resolve(__dirname, './node_modules/@mui/icons-material')
    }
  }
})

