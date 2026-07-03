import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // expose on LAN (0.0.0.0) so you can open from any device
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
