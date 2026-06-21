import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Menjalankan compiler Tailwind v4
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Persiapan path alias untuk shadcn
    },
  },
})