import {DevEnv, Err} from "ic10";
import Line from "ic10/dist/core/Line";
import {reactive} from "vue";

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

class Env extends DevEnv {
	constructor() {
		super();
		this.data = reactive({})
		this.stack = reactive([])
		this.devices = reactive(new Map())
		this.reset()
	}

	public deviceNames: Map<string, string> = new Map<string, string>();


	reset() {
		this.aliases = new Map<string, string | number>()
		this.setDefaultAliases()
		this.errors = []
		this.lines = []
		for (const dataKey in this.data) {
			delete this.data[dataKey]
		}
		for (const key of ['r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17']) {
			this.data[key] = 0
		}
		for (let i = 0; i < 512; i++) {
			this.stack[i] = 0
		}
	}

	reverseAlias(alias: string): string[] {
		const out: string[] = []
		this.aliases.forEach((value, key,) => {
			if (value == alias) {
				out.push(key)
			}
		})
		return out;
	}

	async beforeLineRun(_line: Line): Promise<void> {

	}

	async afterLineRun(_line?: Line): Promise<void> {
		//@ts-ignore
		this.emit('update')
		return await new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve()
			}, 300)
		})
	}

	hcf(): this {
		this.throw(new HCF("HCF", "info", this.getPosition()))
		return super.hcf();
	}

	appendDevice(hash: number, name?: number): string {
		const out = super.appendDevice(hash, name);
		//@ts-ignore
		this.emit('update')
		return out;
	}

	removeDevice(id: string): this {
		super.removeDevice(id);
		//@ts-ignore
		this.emit('update')
		return this;
	}

	attachDevice(id: string, port: string): this {
		super.attachDevice(id, port);
		//@ts-ignore
		this.emit('update')
		return this;
	}

	detachDevice(id: string): this {
		super.detachDevice(id);
		//@ts-ignore
		this.emit('update')
		return this;
	}

	getErrorCount(): number {
		return this.errors.length
	}

	throw(err: Err): this {
		err.lineStart = err.lineStart ?? this.getPosition()
		this.errors.push(err)
		this.emit(err.level, err)
		//@ts-ignore
		this.emit('update')
		return this
	}
}

export default Env;
