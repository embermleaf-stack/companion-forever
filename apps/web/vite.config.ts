// SPDX-License-Identifier: GPL-3.0-only
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Relative base works under the GitHub Pages project path (/companion-forever/) and locally.
// Two pages: the About page and the static Battle.net callback hand-off page (/bnet-callback/).
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "bnet-callback": resolve(__dirname, "bnet-callback/index.html"),
      },
    },
  },
});
