import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/graphql': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },

      }
    },
    define: {
      REACT_APP_MAP_BOX_API: JSON.stringify(env.REACT_APP_MAP_BOX_API),
      GEOCODE: JSON.stringify(env.GEOCODE)
    },
  }
});

