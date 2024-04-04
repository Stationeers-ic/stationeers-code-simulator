import { DevEnv, Err, hash as Hash, Line } from "ic10"
import { reactive } from "vue"
import { settingStore } from "../store"
import { z } from "zod"

class HCF extends Err {
	constructor(
		message: string,
		public level: "error" | "warn" | "info" | "debug" = "error",
		public lineStart?: number,
		public lineEnd?: number,
		public charStart?: number,
		public charEnd?: number,
	) {
		super(message, level, lineStart, lineEnd, charStart, charEnd)
		this.name = "HCF"
	}
}

class Env extends DevEnv<{ update: () => void; update_code: () => void }> {
	public yieldMode: boolean = false
	public preAlias: Map<string, string | number> = new Map<string, string>()

	constructor() {
		super()
		this.data = reactive({})
		this.stack = reactive([])
		this.devices = reactive(new Map())
		const id = this.appendDevice(-128473777, Hash("Circuit Housing"),1)
		this.attachDevice(id, "db")
		this.deviceNames.set(id, "Circuit Housing")
		this.deviceNames.set("Circuit Housing", id)
		this.setDeviceProp(id, "Slots.0.OccupantHash", -744098481)
		this.setDeviceProp(id, "Slots.0.Occupied", 1)
		this.setDeviceProp(id, "Slots.0.Quantity", 1)
		this.reset()
	}

	public deviceNames: Map<string, string> = new Map<string, string>()

	prepare() {
		this.preAlias.clear()
		this.lines
			.filter((l) => l?.fn === "alias")
			.forEach((l) => {
				if (l?.args[0] && l?.args[1]) {
					//@ts-ignore
					this.preAlias.set(l?.args[0], l?.args[1])
				}
			})
		this.emit("update")
	}

	reset() {
		this.aliases = new Map<string, string | number>()
		this.setDefault()
		this.errors = []
		this.lines = []
		for (const dataKey in this.data) {
			delete this.data[dataKey]
		}
		for (const key of ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15", "r16", "r17"]) {
			this.data[key] = 0
		}
		for (let i = 0; i < 512; i++) {
			this.stack[i] = 0
		}
	}

	reverseAlias(alias: string): string[] {
		const out: string[] = []
		this.aliases.forEach((value, key) => {
			if (value == alias) {
				out.push(key)
			}
		})
		return out
	}

	async beforeLineRun(_line: Line): Promise<void> {}

	async afterLineRun(_line?: Line): Promise<void> {
		this.emit("update")
		if (this.yieldMode) {
			return
		}
		const db = this.devicesAttached.get("db")
		if (db) {
			this.setDeviceProp(db, "LineNumber", this.getPosition())
			this.setDeviceProp(db, "Error", this.getErrorCount() > 0 ? 1 : 0)
		}
		return await new Promise<void>((resolve) => {
			let delay = 300
			switch (settingStore.delay) {
				case "fast":
					delay = 20
					break
				case "normal":
					delay = 300
					break
				case "slow":
					delay = 1000
					break
			}
			setTimeout(() => {
				resolve()
			}, delay)
		})
	}

	hcf(): this {
		this.throw(new HCF("HCF", "info", this.getPosition()))
		return super.hcf()
	}

	getAlias(alias: string, pre = false): string {
		if (this.aliases.has(alias)) {
			const val = this.aliases.get(alias)
			if (z.string().safeParse(val).success) {
				return val as string
			}
		}
		if (pre) {
			if (this.preAlias.has(alias)) {
				return this.preAlias.get(alias) as string
			}
		}
		return alias
	}

	appendDevice(hash: number, name?: number, id?: number): string {
		const out = super.appendDevice(hash, name, id)
		this.emit("update")
		return out
	}

	removeDevice(id: string): this {
		super.removeDevice(id)
		this.emit("update")
		return this
	}

	attachDevice(id: string, port: string): this {
		if (this.devicesAttached.has(port)) {
			const old = this.devicesAttached.get(port)
			if (old) {
				this.detachDevice(old, port)
			} else {
				this.devicesAttached.delete(port)
			}
		}
		this.devicesAttached.set(port, id)
		this.devicesAttached.set(id, port)

		this.emit("update")
		return this
	}

	detachDevice(id: string, port?: string): this {
		this.devicesAttached.delete(id)
		if (port === undefined) {
			this.devicesAttached.forEach((value, key) => {
				if (value == id) {
					this.devicesAttached.delete(key)
				}
			})
		} else {
			this.devicesAttached.forEach((value, key) => {
				if (value == id && key == port) {
					this.devicesAttached.delete(key)
				}
			})
		}

		this.emit("update")
		return this
	}

	getErrorCount(): number {
		return this.errors.filter((e) => e.level == "error").length
	}

	throw(err: Err): this {
		err.lineStart = err.lineStart ?? this.getPosition()
		this.errors.push(err)
		this.emit(err.level, err)
		this.emit("update")
		return this
	}
}

export default Env
