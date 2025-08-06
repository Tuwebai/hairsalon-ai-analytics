import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Optimización de chunks
        manualChunks: {
          // Separar React y React DOM en un chunk separado
          'react-vendor': ['react', 'react-dom'],
          // Separar librerías de gráficos
          'charts-vendor': ['recharts', 'd3'],
          // Separar librerías de UI
          'ui-vendor': ['framer-motion', 'lucide-react'],
          // Separar librerías de utilidades
          'utils-vendor': ['date-fns', 'axios', 'clsx', 'tailwind-merge']
        },
        // Optimización de nombres de archivos
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `js/[name]-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      }
    },
    // Optimización de minificación
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      }
    },
    // Optimización de source maps
    sourcemap: false, // Deshabilitar en producción para mejor rendimiento
    // Optimización de assets
    assetsInlineLimit: 4096, // Inline assets menores a 4KB
    // Optimización de CSS
    cssCodeSplit: true,
    // Optimización de reporte de bundle
    reportCompressedSize: false // Mejora el tiempo de build
  },
  plugins: [
    tsconfigPaths(), 
    react({
      // Optimización de JSX
      jsxRuntime: 'automatic',
      // Optimización de Fast Refresh
      fastRefresh: true
    }), 
    tagger()
  ],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new'],
    // Optimización del servidor de desarrollo
    hmr: {
      overlay: false // Deshabilitar overlay de errores para mejor rendimiento
    }
  },
  // Optimización de resolución de módulos
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
      '@styles': '/src/styles'
    }
  },
  // Optimización de CSS
  css: {
    // Optimización de PostCSS
    postcss: './postcss.config.js'
  },
  // Optimización de dependencias
  optimizeDeps: {
    // Pre-bundle de dependencias comunes
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'recharts',
      'd3',
      'date-fns',
      'axios',
      'clsx',
      'tailwind-merge'
    ],
    // Excluir dependencias que no necesitan pre-bundle
    exclude: ['@dhiwise/component-tagger']
  },
  // Optimización de assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.ico'],
  // Configuración de preview
  preview: {
    port: 4173,
    host: true,
    strictPort: true
  },
  // Configuración de worker
  worker: {
    format: 'es'
  },
  // Configuración de define para variables de entorno
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production')
  }
});