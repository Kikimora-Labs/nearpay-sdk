import {resolve} from 'path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

import {name, version} from './package.json';

console.log(`🚀 vite.config.ts ${name} VERSION: ${version}`);

export default defineConfig({
  plugins: [
    dts({
      staticImport: true,
      rollupTypes: true,
    }),
  ],
  define: {
    __VERSION__: JSON.stringify(version),
  },
  build: {
    target: 'es2016',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@nearpay/nearpay-sdk',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
