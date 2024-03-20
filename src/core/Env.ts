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
		this.reset()
	}
	public deviceNames: Map<string,string> = new Map<string,string>();


	reset() {
		this.aliases = new Map<string, string | number>()
		this.errors = []
		this.lines = []
		this.data['r0'] = 0
		this.data['r1'] = 0
		this.data['r2'] = 0
		this.data['r3'] = 0
		this.data['r4'] = 0
		this.data['r5'] = 0
		this.data['r6'] = 0
		this.data['r7'] = 0
		this.data['r8'] = 0
		this.data['r9'] = 0
		this.data['r10'] = 0
		this.data['r11'] = 0
		this.data['r12'] = 0
		this.data['r13'] = 0
		this.data['r14'] = 0
		this.data['r15'] = 0
		this.data['r16'] = 0
		this.data['r17'] = 0
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

	async afterLineRun(_line: Line): Promise<void> {
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


}

export default Env;
