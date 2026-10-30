import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const onwarn = (warning: any, warn: any) => {
  if (
    warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
    warning.message?.includes('MODULE_LEVEL_DIRECTIVE') ||
    warning.message?.includes('"use client"')
  ) {
    return
  }
  warn(warning)
}

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  build: {
    rollupOptions: {
      onwarn,
    },
  },
  plugins: [
    devtools(),
    nitro({
      preset: 'cloudflare-pages',
      compatibilityDate: '2025-09-01',
      rollupConfig: {
        external: [/^@sentry\//],
        onwarn,
      },
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
