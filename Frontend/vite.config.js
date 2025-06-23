import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  content: ["./src/**/*.{html,js,jsx}"],
  plugins: [
    react(),
   
  ],
})

