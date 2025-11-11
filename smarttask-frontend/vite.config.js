import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Use the React plugin for Vite
  plugins: [react()],
  // Set up the development server configuration
  server: {
    // We will run the React UI on port 5173 (Vite default)
    // while the Javalin backend runs on another port (e.g., 8080)
    port: 5173,
    open: true, // Automatically opens the browser
  },
  // Configure Vitest for testing
  test: {
    environment: 'jsdom',
  },
});