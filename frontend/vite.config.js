import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    allowedHosts: [
      "nondomineering-dot-untimidly.ngrok-free.dev",
      "ec2-13-201-64-163.ap-south-1.compute.amazonaws.com",
    ],
    // allowedHosts: "all",
    // port: 5173,
    host: "0.0.0.0",
  },
});
