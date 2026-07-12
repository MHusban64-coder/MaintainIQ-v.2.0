import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          firebaseCore: ['firebase/app'],
          firebaseAuth: ['firebase/auth'],
          firebaseFirestore: ['firebase/firestore'],
          firebaseStorage: ['firebase/storage'],
          charts: ['recharts'],
          qr: ['react-qr-code', 'html5-qrcode'],
        },
      },
    },
  },
});
