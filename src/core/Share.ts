import {codeStore} from "../store";
import ic10 from "./ic10.ts";
import pako from 'pako';

export function dump() {
	const code = codeStore.code;

	const dump = {
		code,
		devices: Object.fromEntries(ic10.getEnv().devices.entries()),
		deviceNames: Object.fromEntries(ic10.getEnv().deviceNames.entries())
	}

	const compressed = pako.deflate(JSON.stringify(dump), {level: 9})
	//@ts-ignore
	return window.btoa(String.fromCharCode.apply(null, compressed))
}

export function load(dump: any): void {
	const compressed = new Uint8Array( window.atob(dump).split("").map(function(c) {
		return c.charCodeAt(0); }));
	const restored = JSON.parse(pako.inflate(compressed, {to: 'string'}));
	console.log(restored)

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
