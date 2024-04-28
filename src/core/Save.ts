import {downloadFile, dump, load} from "./Share.ts"
import {z} from "zod"
import {emit} from "./Events.ts"
import ic10 from "./ic10.ts"

export async function startupLoad(): Promise<string | false> {
	if (await loadFromUrl()) {
		return "url"
	} else if (await loadFromTmp()) {
		return "temp"
	} else if (await loadFromBrowser()) {
		return "browser"
	}
	return false
}

export async function loadFromString(string: string): Promise<boolean> {
	await load(string)
	return true
}

export async function loadFromFile(content: string, name?: string): Promise<string> {
	const lines = content.split("\n")
	const str = lines.findLast((line) => line.startsWith("##!"))
	const trimContent = lines.filter((line) => !line.startsWith("##!")).join("\n")
	if (str) {
		const url = new URL(str.replace("##!", ""))
		return await load(url.hash.slice(1), trimContent)
	} else {
		ic10.setCode(trimContent)
	}
	return name ?? getDefaultScriptName()
}

async function loadFromUrl(): Promise<boolean> {
	if (document.location.hash.slice(1).length > 0) {
		await loadFromString(document.location.hash.slice(1))
		setTimeout(() => {
			document.location.hash = ""
		}, 500)
		return true
	}
	return false
}

export function getShareLink() {
	const url = new URL(document.location.href)
	url.hash = dump()
	return url.toString()
}

async function loadFromBrowser() {
	const name = window.localStorage.getItem("currentScriptName")
	if (name) {
		const data = window.localStorage.getItem(name)
		if (data) {
			return await load(data)
		}
	}
	return false
}

async function loadFromTmp() {
	const data = window.localStorage.getItem("tempSave")
	if (data) {
		return await load(data)
	}
	return false
}

export async function saveToFile(): Promise<boolean> {
	const code = ic10.getCode()
	const shareString = getShareLink()
	const name = getActiveSaveSlot()?.replace(".ic10", "") + ".ic10"
	const file = code + "\n##! Changes in code does not reflect in link below !!\n##!" + shareString
	downloadFile(file, name)
	return true
}

export function saveExist(name: string) {
	return getScriptNames().has(name)
}

export function saveToBrowser(name?: string, isNew = false) {
	if (name == undefined) {
		name = window.localStorage.getItem("currentScriptName") ?? undefined
	}
	if (name == undefined) {
		throw new Error("Needed script name, use ctrl+shift+s for set")
	}
	const saveData = dump()
	let newName = name
	if (isNew) {
		let i = 1
		while (saveExist(newName)) {
			newName = `${name} (${i})`
			i++
		}
	}
	addSaveSlot(newName)
	window.localStorage.setItem(newName, saveData)
	emit("saveUpdate")
	return newName
}

export function removeFromBrowser(name: string) {
	removeSaveSlot(name)
	window.localStorage.removeItem(name)
	const ScriptNames = getScriptNames()
	ScriptNames.delete(name)
	setScriptNames(ScriptNames)
	window.localStorage.removeItem("currentScriptName")
	emit("saveUpdate")
}

export function getScriptNames() {
	return new Set(z.array(z.string()).parse(JSON.parse(localStorage.getItem("ScriptNames") ?? "[]")))
}

function setScriptNames(data: Set<string>) {
	window.localStorage.setItem("ScriptNames", JSON.stringify(Array.from(data)))
}

function addSaveSlot(name: string, setCurrent = true) {
	const ScriptNames = getScriptNames()
	ScriptNames.add(name)
	setScriptNames(ScriptNames)
	if (setCurrent) {
		window.localStorage.setItem("currentScriptName", name)
	}
}

function removeSaveSlot(name: string) {
	const ScriptNames = getScriptNames()
	ScriptNames.delete(name)
	setScriptNames(ScriptNames)
}

export async function setActiveSaveSlot(name: string) {
	const ScriptNames = getScriptNames()
	if (ScriptNames.has(name)) {
		window.localStorage.setItem("currentScriptName", name)
		await load(window.localStorage.getItem(name))
		emit("saveUpdate")
	}
}

export function getActiveSaveSlot(): string {
	return window.localStorage.getItem("currentScriptName") ?? getDefaultScriptName()
}

export function getDefaultScriptName(): string {
	return "default_script_name"
}

export function tmpSave() {
	const saveData = dump()
	localStorage.setItem("tempSave", saveData)
}

declare global {
	interface Window {
		tmpSave: typeof tmpSave
	}
}

window.tmpSave = tmpSave
