import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/preview/',
	plugins: [vue()],
	resolve: {
		preserveSymlinks: true,
	},
})
