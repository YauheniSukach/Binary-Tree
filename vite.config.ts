import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

interface ViteConfigArgs {
  mode: string;
}

export default ({ mode }: ViteConfigArgs) => {
  const isProduction = mode === 'production';
  const generateScopedName = isProduction
    ? '[hash:base64:5]'
    : '[local]_[hash:base64:5]';

  const plugins = isProduction
    ? [splitVendorChunkPlugin(), react()]
    : [react()];

  return defineConfig({
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-router-dom', 'react-dom'],
          },
        },
      },
    },
    plugins,
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
        generateScopedName,
      },
    },
    server: {
      open: true,
      port: 3003,
    },
  });
};
