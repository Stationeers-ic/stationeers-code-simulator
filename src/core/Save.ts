import { dump } from "./Share.ts"
import { z } from "zod"

export function load() {}

export function saveToBrowser(name: string) {
	const saveData = dump()
	addSaveSlot(name)
	window.localStorage.setItem(name, saveData)
}

export function removeFromBrowser(name: string) {
	removeSaveSlot(name)
	window.localStorage.removeItem(name)
}

function addSaveSlot(name: string) {
	const ScriptNames = new Set(z.array(z.string()).parse(JSON.parse(localStorage.getItem("ScriptNames") ?? "[]")))
	ScriptNames.add(name)
	window.localStorage.setItem("ScriptNames", JSON.stringify(Array.from(ScriptNames)))
}

function removeSaveSlot(name: string) {
	const ScriptNames = new Set(z.array(z.string()).parse(JSON.parse(localStorage.getItem("ScriptNames") ?? "[]")))
	ScriptNames.delete(name)
	window.localStorage.setItem("ScriptNames", JSON.stringify(Array.from(ScriptNames)))
}
