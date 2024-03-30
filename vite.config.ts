import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"
import {spawnSync} from "child_process"

// this is a lot more work than it could be
const { status, stdout, stderr } = spawnSync("npm", ["list", "--json"], {
	encoding: "utf8",
})
// this is a lot more work than it could be
// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	plugins: [vue()],
	resolve: {
		preserveSymlinks: true,
	},
	define: {
		__package__: stdout,
		__buildTime__: Date.now(),
	},
})
