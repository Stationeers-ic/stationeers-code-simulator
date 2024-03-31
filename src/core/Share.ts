import ic10 from "./ic10.ts"
import pako from "pako"
import { z } from "zod"

const dumpShema = z
	.object({
		code: z.string(),
		devices: z.record(
			z
				.object({
					Name: z.number().optional(),
					PrefabHash: z.number(),
				})
				.passthrough(),
		),
		deviceNames: z.record(z.string().or(z.number())),
		devicesAttached: z.record(z.string().or(z.number())),
	})
	.passthrough()

export function dump(overwriteCode?: string): string {
	const code = overwriteCode ?? ic10.getCode()
	const dump = {
		code,
		devices: Object.fromEntries(ic10.getEnv().devices.entries()),
		deviceNames: Object.fromEntries(ic10.getEnv().deviceNames.entries()),
		devicesAttached: Object.fromEntries(ic10.getEnv().devicesAttached.entries()),
	}
	console.debug(dump)
	const compressed = pako.deflate(JSON.stringify(dump), { level: 9 })
	//@ts-ignore
	return window.btoa(String.fromCharCode.apply(null, compressed))
}

export async function load(dump: any): Promise<true> {
	return new Promise((resolve, reject) => {
		try {
			const compressed = new Uint8Array(
				window
					.atob(dump)
					.split("")
					.map(function (c) {
						return c.charCodeAt(0)
					}),
			)
			const json = JSON.parse(pako.inflate(compressed, { to: "string" }))
			console.debug(json)
			const restored = dumpShema.parse(json)
			ic10.setCode(restored.code)

			ic10.getEnv().devices.clear()
			for (const [key, value] of Object.entries(restored.devices)) {
				const id = ic10.getEnv().appendDevice(value.PrefabHash, value.Name, +key)

				const slots = z.record(z.record(z.number())).safeParse(value?.Slots)
				if (slots.success) {
					for (const [index, slot] of Object.entries(slots.data)) {
						for (const [name, val] of Object.entries(slot)) {
							ic10.getEnv().setDeviceProp(id, `Slots.${index}.${name}`, val)
						}
					}
				}
			}
			ic10.getEnv().devicesAttached.clear()
			for (const [key, value] of Object.entries(restored.devicesAttached)) {
				ic10.getEnv().devicesAttached.set(key, value.toString())
			}
			ic10.getEnv().deviceNames.clear()
			for (const [key, value] of Object.entries(restored.deviceNames)) {
				ic10.getEnv().deviceNames.set(key, value.toString())
			}
			resolve(true)
		} catch (e) {
			reject(e)
		}
	})
}

export function downloadFile(text: string, filename: string): void {
	// Удаление запрещенных символов из имени файла
	const safeFilename = filename.replace(/[\/\\:*?"<>|]/g, "")

	const blob = new Blob([text], { type: "text/plain" })
	const url = URL.createObjectURL(blob)

	const link = document.createElement("a")
	link.href = url
	link.download = safeFilename
	link.click()

	URL.revokeObjectURL(url)
}

declare global {
	interface Window {
		dump: typeof dump
		load: typeof load
		downloadFile: typeof downloadFile
	}
}
window.dump = dump
window.load = load
window.downloadFile = downloadFile

export default { dump, load, downloadFile }
