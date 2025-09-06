

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  server: {
    hmr: true,
  },
});


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     hmr: false, // disable HMR to check if it’s causing double injection
//   },
// });
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     target: "esnext",   // or "modules" or a modern value like "es2022"
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       target: "esnext",  // ensure dep optimization matches
//     },
//   },
// });