import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react-swc'
import * as fs from 'fs'
import * as path from 'path'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import { checker } from 'vite-plugin-checker'
import { createHtmlPlugin } from 'vite-plugin-html'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import tsconfigPaths from 'vite-tsconfig-paths'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relative: string) => path.resolve(appDirectory, relative)
const root = path.resolve(__dirname, resolveApp('src'))

enum BaseModes {
  Development = 'development',
  Production = 'production',
  Analyze = 'analyze',
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // const buildVersion = env.VITE_APP_BUILD_VERSION

  return {
    ...(env.VITE_PORT
      ? {
          server: {
            port: Number(env.VITE_PORT),
          },
        }
      : {}),
    plugins: [
      nodePolyfills(),
      react(),
      tsconfigPaths(),
      createSvgIconsPlugin({
        iconDirs: [
          path.resolve(process.cwd(), 'src/assets/icons'),
          path.resolve(process.cwd(), 'src/assets/illustrations'),
        ],
        symbolId: '[name]',
      }),
      checker({
        // remove if you want to prevent build with errors || warnings
        enableBuild: false,
        typescript: true,
        overlay: {
          initialIsOpen: false,
          position: 'br',
        },
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "{src,config}/**/*.{jsx,tsx}" --cache',
        },
      }),
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.tsx',
        inject: {
          data: {
            host: env.VITE_APP_DOMAIN,
          },
        },
      }),
      ...(mode === BaseModes.Analyze
        ? [
            visualizer({
              open: true,
            }),
          ]
        : []),
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      dedupe: ['react', 'lodash'],
      alias: {
        '@': `${root}/`,
        '@config': `${root}/config.ts`,
        '@public': `${root}/../static`,
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: false,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
          nodePolyfills(),
          rollupNodePolyFill(),
        ],

        output: {
          sourcemap: true,
        },
      },
    },
  }
})
