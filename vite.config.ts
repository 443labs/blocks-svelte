import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  base: '/443labs.github.io/',
  plugins: [svelte()],
  base: '/blocks-svelte/',
})
