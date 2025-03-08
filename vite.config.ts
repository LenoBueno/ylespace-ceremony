
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Dynamic import for ESM module
const loadComponentTagger = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      const { componentTagger } = await import("lovable-tagger");
      return componentTagger;
    } catch (error) {
      console.error("Failed to load lovable-tagger:", error);
      return null;
    }
  }
  return null;
};

export default defineConfig(async ({ mode }) => {
  const tagger = mode === 'development' ? await loadComponentTagger() : null;
  
  return {
    server: {
      host: "::",
      port: 8080,
      allowedHosts: ["3a861138-84be-4650-84c5-82f3f7357797.lovableproject.com", "*.lovableproject.com"],
    },
    plugins: [
      react(),
      tagger,
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
