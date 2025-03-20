import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// Some tools like Vitest VSCode extensions, have trouble with resolving relative paths,
// as they use the directory of the test file as `cwd`, which makes them believe that
// `setupFiles` live next to the test file itself. This forces them to always resolve correctly.
const dirname = fileURLToPath(new URL('.', import.meta.url))

// Register custom loaders to emulate webpack's behavior
const nodeArgs = ['--import=./tests/loaders/register.mjs']

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: ['.'],
    }),
  ],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './../../packages/ui/src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom', // TODO(kamil): This should be set per test via header in .tsx files only
    include: [resolve(dirname, './**/*.test.{ts,tsx}')],
    restoreMocks: true,
    poolOptions: {
      threads: { execArgv: nodeArgs },
      forks: { execArgv: nodeArgs },
      vmThreads: { execArgv: nodeArgs },
      vmForks: { execArgv: nodeArgs },
    },
    setupFiles: [
      resolve(dirname, './tests/vitestSetup.ts'),
      resolve(dirname, './tests/setup/polyfills.js'),
      resolve(dirname, './tests/setup/radix.js'),
    ],
  },
})
