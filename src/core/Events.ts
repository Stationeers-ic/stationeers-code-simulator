export function emit(name: string, value?: any) {
	window.document.dispatchEvent(new Event(name, value))
}

export function on(name: string, callback: (Event: any) => void) {
	window.document.addEventListener(name, callback)
}

export function off(name: string, callback: (Event: any) => void) {
	window.document.removeEventListener(name, callback)
}
