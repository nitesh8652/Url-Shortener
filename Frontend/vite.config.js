import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        warn(warning)
      }
    }
  },
  plugins: [
    react({
      // Use the new JSX transform
      jsxRuntime: 'automatic',
      include: "**/*.{jsx,js}",
    }),
  ]
})




