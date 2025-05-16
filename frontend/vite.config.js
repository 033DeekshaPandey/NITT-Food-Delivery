import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("lodash")) return "vendor-lodash";
            if (id.includes("react-quill")) return "vendor-quill";
            return "vendor";
          }
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "unknown";
          if (name.endsWith(".css")) return "static/css/[name]-[hash][extname]";
          if (/\.(png|jpg|jpeg|gif|svg)$/.test(name)) {
            return "static/media/[name]-[hash][extname]";
          }
          return "static/assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
