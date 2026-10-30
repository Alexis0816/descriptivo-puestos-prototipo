import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/descriptivo-puestos-prototipo/' : '/',
  plugins: [tailwindcss()],
  server: { watch: { ignored: ['**/*.pdf'] } },
}));
