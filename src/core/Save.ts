import { dump, load } from "./Share.ts"
import { z } from "zod"

export async function startupLoad(): Promise<string | false> {
	if (!(await loadFromUrl())) {
		if (await loadFromBrowser()) {
			return "from browser"
		}
		return false
	}
	return "from url"
}

export async function loadFromString(string: string): Promise<boolean> {
	await load(string)
	return true
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

async function loadFromBrowser(): Promise<boolean> {
	const name = window.localStorage.getItem("currentScriptName")
	if (name) {
		const data = window.localStorage.getItem(name)
		if (data) {
			return await load(data)
		}
	}
	return false
}

export async function loadFromFile(): Promise<boolean> {
	return true
}

export function saveToBrowser(name?: string) {
	if (name == undefined) {
		name = window.localStorage.getItem("currentScriptName") ?? undefined
	}
	if (name == undefined) {
		throw new Error("Needed script name, use ctrl+shift+s for set")
	}
	const saveData = dump()
	addSaveSlot(name)
	console.log(name)
	window.localStorage.setItem(name, saveData)
}

export function removeFromBrowser(name: string) {
	removeSaveSlot(name)
	window.localStorage.removeItem(name)
}

function getScriptNames() {
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

export function setActiveSaveSlot(name: string) {
	const ScriptNames = getScriptNames()
	if (ScriptNames.has(name)) {
		window.localStorage.setItem("currentScriptName", name)
	}
}
