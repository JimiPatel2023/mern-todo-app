import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host:true,
    port:4000,
    proxy: {
      "/api":{
        target:"http://localhost:5000/",
        changeOrigin:true,
        secure:false,
      }
    },
  },
});
