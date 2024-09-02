import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    tsconfigPaths(),
    react(),
  ],
  optimizeDeps: {
    exclude: [...(mode === 'development' ? ['dev-folio-types', 'dev-folio-react'] : [])],
  },
}))
