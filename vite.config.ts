import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

const getPath = (route) => path.resolve(__dirname, route);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": getPath("./src/"),
      "@components": getPath("./src/shared/components/"),
      "@shared": getPath("./src/shared/"),
      "@routes": getPath("./src/routes/"),
      "@styles": getPath("./src/styles/"),
      "@pages": getPath("./src/pages/"),
      "@store": getPath("./src/store/"),
      "@services": getPath("./src/services/"),
    },
  },
});
