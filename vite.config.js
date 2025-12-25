import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@mui/icons-material": path.resolve(
        __dirname,
        "./scripts/icons-mapping.jsx"
      ),
    },
  },
});
