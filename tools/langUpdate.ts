import * as path from "path"
import * as fs from "fs/promises"
import axios from "axios"
import qs from "qs"

const locales = path.join(__dirname, "..", "src/locales")
type lang = {
	code: string
	name: string
	percentage: number
	ICON: string
}
try {
	let data = qs.stringify({
		api_token: "9ea7323d0999f2496ea61b643eecc361",
		id: "700722",
	})
	//@ts-ignore
	const languages = await axios.post<{
		result: {
			languages: lang[]
		}
	}>("https://api.poeditor.com/v2/languages/list", data)
	const tasks: lang[] = []
	await Promise.all(
		languages.data.result.languages.map(async (lang) => {
			console.time("Downloaded")
			const dir = path.join(locales, lang.code)
			const filename = path.join(dir, "index.json")
			await fs.rm(dir, { recursive: true })
			if (lang.percentage < 20) {
				console.info("Skip lang", lang.code)
				return
			}

			let data = qs.stringify({
				api_token: "9ea7323d0999f2496ea61b643eecc361",
				id: "700722",
				language: lang.code,
				type: "i18next",
				filters: "translated",
			})
			const poExport = (await axios.post<{ result: { url: string } }>(`https://api.poeditor.com/v2/projects/export`, data)).data
			const file = (await axios.get(poExport.result.url)).data
			await fs.mkdir(dir, { recursive: true })
			await fs.writeFile(filename, JSON.stringify(file, null, "\t"))
			console.timeLog("Downloaded", filename)
			try {
				lang.ICON = file.ICON
			} catch (e) {}
			return tasks.push(lang)
		}),
	)
	tasks.sort((a, b) => {
		if (a.code < b.code) {
			return -1
		}
		if (a.code > b.code) {
			return 1
		}
		return 0
	})

	await fs.writeFile(path.join(__dirname, "..", "src/languages.json"), JSON.stringify(tasks, null, "\t"))
} catch (e) {
	console.error(e.message)
}
