import mkcert from "vite-plugin-mkcert";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(), // Enable mkcert for local HTTPS
  ],
  resolve: {
    alias: {
      "@mui/styled-engine": "@mui/styled-engine-sc",
    },
  },
  server: {
    https: true,
    host: true, // Optional: Allows access from local network (e.g., mobile testing)
  },
  assetsInclude: ['**/*.splinecode'],
});
