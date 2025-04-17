import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {allowedHosts: ["127.0.0.1", "localhost", "[::1]"], 
           proxy:{
            "/ssrf-test": "http://localhost:5008",
           },
  },
})
