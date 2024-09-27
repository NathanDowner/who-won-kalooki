import path from 'node:path';
import { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const configuration: UserConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};

export default configuration;
