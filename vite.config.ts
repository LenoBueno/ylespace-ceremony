
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Using dynamic imports for ESM modules
export default defineConfig(async ({ mode }) => {
  // Dynamically import the componentTagger function only in development mode
  let componentTaggerPlugin = null;
  if (mode === 'development') {
    try {
      const { componentTagger } = await import('lovable-tagger');
      componentTaggerPlugin = componentTagger();
    } catch (error) {
      console.warn('Could not load lovable-tagger, continuing without it');
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      allowedHosts: ["3a861138-84be-4650-84c5-82f3f7357797.lovableproject.com", "*.lovableproject.com"],
    },
    plugins: [
      react({
        tsDecorators: true,
        // Enable JSX in .tsx files
        include: "**/*.{tsx,jsx,ts,js}",
      }),
      componentTaggerPlugin,
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
    esbuild: {
      jsx: 'automatic',
      jsxInject: `import React from 'react'`
    }
  };
});
