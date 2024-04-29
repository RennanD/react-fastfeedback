import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dts from 'vite-plugin-dts'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'react-feedbacki',
      fileName: (format) => `index.${format}.js`,
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts()],
})
