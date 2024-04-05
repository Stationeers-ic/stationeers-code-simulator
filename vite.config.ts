import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { spawnSync } from "child_process"

// this is a lot more work than it could be
const { status, stdout, stderr } = spawnSync("npm", ["list", "--json"], {
	encoding: "utf8",
})
// this is a lot more work than it could be
// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	plugins: [vue()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('ic10')) {
							return 'ic10'
						}
						const pkgName = (id.match(/node_modules\/([^/]+)/) ?? [])[1];
						if (pkgName) return `vendor-${pkgName}`;

						return 'vendor'
					}
				}
			}
		}
	},
	resolve: {
		preserveSymlinks: true,
	},
	define: {
		__package__: stdout,
		__buildTime__: Date.now(),
	},
})
