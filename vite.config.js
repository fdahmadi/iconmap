import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve original package first to avoid cycles
      "@mui/icons-material-original": path.resolve(
        __dirname,
        "node_modules/@mui/icons-material"
      ),
      // Then resolve the mapping file
      "@mui/icons-material": path.resolve(__dirname, "icons-mapping.jsx"),
    },
  },
});
