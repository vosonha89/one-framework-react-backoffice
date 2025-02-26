import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  envDir: "./configuration/environment",
  esbuild: {
    supported: {
      'top-level-await': true
    }
  },
  plugins: [
    react()
  ],
})
