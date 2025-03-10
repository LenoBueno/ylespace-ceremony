
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Use dynamic import for ESM modules
export default defineConfig(async ({ mode }) => {
  // Dynamically import the componentTagger function only in development mode
  const componentTaggerModule = mode === 'development' 
    ? await import('lovable-tagger').then(m => m.componentTagger) 
    : null;

  return {
    server: {
      host: "::",
      port: 8080,
      allowedHosts: ["3a861138-84be-4650-84c5-82f3f7357797.lovableproject.com", "*.lovableproject.com"],
    },
    plugins: [
      react(),
      mode === 'development' && componentTaggerModule ? componentTaggerModule() : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        format: "esm",
      },
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      rollupOptions: {
        output: {
          preserveModules: true,
          format: "esm"
        }
      }
    },
  };
});
