/* import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig( {
    plugins: [ react() ]
} ); */


/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig( {
    plugins: [ react() ],
    // @ts-ignore
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: [ "./src/test/setupTests.js" ],
        // you might want to disable it, if you don't have tests that rely on CSS
        // since parsing CSS is slow
        // css: true,
        css: false,
        include: [ "**/*(*.)?{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}" ],
        exclude: [ "node_modules", "dist", ".idea", ".git", ".cache" ],
        coverage: {
            reporter: [ "text", "json", "html" ],
        }
    },
} );
