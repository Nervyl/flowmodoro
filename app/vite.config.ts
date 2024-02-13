import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: false,
        rollupOptions: {
            input: {
                main: "index.html",
                background: "./src/background.tsx",
            },
            output: {
                entryFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },

    plugins: [react()],
    server: {
        port: 3000,
    },
});
