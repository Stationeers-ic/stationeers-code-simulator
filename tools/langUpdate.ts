import * as path from "path"
import * as fs from "fs/promises"
import axios from "axios"

const locales = path.join(__dirname, "..", "src/locales")
type lang = {
	code: string
	name: string
	translated_percent: number
	ICON: string
}
try {
	//@ts-ignore
	const languages = await axios.get<lang[]>("https://translate.traineratwot.site/api/projects/ic10/languages/")
	const tasks: lang[] = []
	await Promise.all(
		languages.data.map(async (lang) => {
			console.time("Downloaded")
			const dir = path.join(locales, lang.code)
			const filename = path.join(dir, "index.json")
			await fs.rm(dir, { recursive: true })
			if (lang.translated_percent < 20) {
				console.info("Skip lang", lang.code)
				return
			}
			const file = (await axios.get(`https://translate.traineratwot.site/api/translations/ic10/locales/${lang.code}/file/`)).data
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
