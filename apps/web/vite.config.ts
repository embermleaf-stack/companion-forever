// SPDX-License-Identifier: GPL-3.0-only
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
});
