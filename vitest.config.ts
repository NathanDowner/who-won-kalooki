import path from 'node:path';
import { defineConfig, UserConfig } from 'vitest/config';
import configuration from './vite.config';

export default defineConfig({
  ...(configuration as UserConfig),
  resolve: {
    alias: {
      ...configuration?.resolve?.alias,
      test: path.resolve(__dirname, './test'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['./src/**/*.test.(ts|tsx)'],
  },
});
