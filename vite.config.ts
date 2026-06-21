import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** GitHub Pages project site: https://abdullah-dev5.github.io/Portfolio/ */
const base = process.env.VITE_BASE_URL ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
