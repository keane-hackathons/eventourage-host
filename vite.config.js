import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "eventourage-app",
      remotes: {
        remoteRacer: "https://eventourage-remote-racer.apps.tas.tz-hackathon.net/assets/remoteEntry.js",
        remoteAmongUs: "https://eventourage-remote-amongus.apps.tas.tz-hackathon.net/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
