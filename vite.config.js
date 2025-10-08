import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                aliceinborderlands: resolve(__dirname, 'aliceInBorderlands.html'),
            },
        },
    },
});