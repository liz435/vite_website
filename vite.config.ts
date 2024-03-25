// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import string from 'vite-plugin-string';

export default defineConfig({
  plugins: [
    react(),
    string({
      include: [
        '**/*.vs',
        '**/*.fs',
        '**/*.vert',
        '**/*.frag',
        '**/*.glsl' // Include all your shader file extensions
      ],
    }),
  ],
});
