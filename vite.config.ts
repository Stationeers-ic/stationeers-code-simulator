import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { spawnSync } from "child_process"
import * as fs from "fs"
import * as path from "path"
import lang from "./src/languages.json"
import packageJson from "./package.json"
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
					if (id.includes("node_modules")) {
						if (id.includes("codemirror-lang-ic10")) {
							return "codemirror-lang-ic10"
						}
						if (id.includes("ic10")) {
							return "ic10"
						}
						const pkgName = (id.match(/node_modules\/([^/]+)/) ?? [])[1]
						if (pkgName) return `vendor-${pkgName}`

						return "vendor"
					}
				},
			},
		},
	},
	//@ts-ignore типы vite устарели
	exclude: ['cypress/**'],
	resolve: {
		preserveSymlinks: true,
	},
	define: {
		__languages__: fs.readdirSync(path.join(__dirname, "src/locales")),
		__LanguageSelector__: lang.map((l) => {
			return {
				name: l.name,
				code: l.code,
				flag: l.ICON ?? "",
				translated_percent: l.translated_percent,
			}
		}),
		__package__: stdout,
		__bugs__: packageJson.bugs ?? '',
		__buildTime__: Date.now(),
	}
})
