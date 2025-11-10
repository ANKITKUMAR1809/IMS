import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'https://ims-yxa0.onrender.com'
    }
  },
  plugins: [react(), tailwindcss(),],
})
