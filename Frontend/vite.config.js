import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  content: ["./src/**/*.{html,js,jsx}"],
  plugins: [
    react({
      // Include .js files for JSX processing
      include: "**/*.{jsx,js}",
    }),
  ],
  esbuild: {
    // Allow JSX in .js files
    jsx: 'automatic',
    jsxInject: `import React from 'react'`,
  }
})


