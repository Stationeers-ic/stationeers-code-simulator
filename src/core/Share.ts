import {codeStore} from "../store";
import ic10 from "./ic10.ts";
import pako from 'pako';
import {z} from "zod";

const dumpShema = z.object({
	code: z.string(),
	devices: z.record(z.object({
		Name: z.number().optional(),
		PrefabHash: z.number(),
	}).passthrough()),
	deviceNames: z.record(z.string().or(z.number())),
	devicesAttached: z.record(z.string().or(z.number()))
}).passthrough()

export function dump(): string {
	const code = codeStore.code;
	const dump = {
		code,
		devices: Object.fromEntries(ic10.getEnv().devices.entries()),
		deviceNames: Object.fromEntries(ic10.getEnv().deviceNames.entries()),
		devicesAttached: Object.fromEntries(ic10.getEnv().devicesAttached.entries())
	}
	console.debug(dump)
	const compressed = pako.deflate(JSON.stringify(dump), {level: 9})
	//@ts-ignore
	return window.btoa(String.fromCharCode.apply(null, compressed))
}

export async function load(dump: any): Promise<true> {
	return new Promise((resolve, reject) => {
		try {
			const compressed = new Uint8Array(window.atob(dump).split("").map(function (c) {
				return c.charCodeAt(0);
			}));
			const json = JSON.parse(pako.inflate(compressed, {to: 'string'}))
			console.debug(json)
			const restored = dumpShema.parse(json);
			ic10.setCode(restored.code)
			ic10.getEnv().devices.clear()
			for (const [key, value] of Object.entries(restored.devices)) {
				ic10.getEnv().appendDevice(value.PrefabHash, value.Name, +key)
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

declare global {
	interface Window {
		dump: typeof dump
		load: typeof load
	}
}
window.dump = dump
window.load = load

export default {dump, load}
