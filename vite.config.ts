
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Removendo a importação do componentTagger que está causando problemas de ESM

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["3a861138-84be-4650-84c5-82f3f7357797.lovableproject.com", "*.lovableproject.com"],
  },
  plugins: [
    react(),
    // Removendo o componentTagger temporariamente
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
}));
