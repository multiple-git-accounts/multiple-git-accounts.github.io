import path from 'path';
import glob from 'fast-glob'
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  publicDir: 'public',
  root: './',
  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync(['./*.html', './pages/**/*.html']).map((file) => [
          path.relative(__dirname, file.slice(0, file.length - path.extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
    },
  }
});