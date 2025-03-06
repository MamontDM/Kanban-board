import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, 'src/store'),
      '@components': path.resolve(__dirname, 'src/components')
    },
  },
  test: {
    globals: true,
    isolate: true,
    environment: "jsdom",
  },
});