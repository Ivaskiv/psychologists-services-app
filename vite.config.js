import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-scw';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
