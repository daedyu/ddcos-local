import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx({ providerImportSource: '@mdx-js/react' })
  ],
  define: {
    'process.env': {},
    Buffer: ['buffer', 'Buffer'],
  },
  optimizeDeps: {
    include: ['buffer'],
  },

})
