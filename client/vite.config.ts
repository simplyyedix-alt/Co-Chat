import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The app is published under /app/ on GitHub Pages and may also be served
// from a custom domain. Relative asset URLs keep both deployments working.
export default defineConfig({
  base: './',
  plugins: [react()],
})
