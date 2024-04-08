import * as path from "path"
import * as fs from "fs"

const locales = path.join(__dirname, "..", "src/locales")
const languages = await ((await fetch("https://translate.traineratwot.site/api/projects/ic10/languages/")).json()) as { code: string, name: string }[]
languages.forEach(async (lang) => {
	console.time("Downloaded")
	const file = await (await fetch(`https://translate.traineratwot.site/api/translations/ic10/locales/${lang.code}/file/`)).text()
	fs.mkdirSync(path.join(locales, lang.code), {
		recursive: true,
	})
	const filename = path.join(locales, lang.code, "index.json")
	fs.writeFileSync(filename, file)
	console.timeLog("Downloaded", filename)
})
