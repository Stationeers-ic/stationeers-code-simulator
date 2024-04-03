import { InterpreterIc10 } from "ic10"
import Env from "./Env.ts"
import { reactive } from "vue"

export class Ic10 extends InterpreterIc10 {
	private static instance: Ic10

	static getInstance() {
		if (!this.instance) {
			this.instance = new Ic10()
		}
		return this.instance
	}

	private constructor() {
		//@ts-ignore
		super(reactive(new Env()), "")
	}

	setCode(code: string): this {
		this.getEnv().lines = []
		super.setCode(code)
		this.getEnv().emit("update_code")
		this.getEnv().prepare()
		this.parseCode()
		return this
	}
	getCode() {
		return this.code
			.trimEnd()
			.split("\n")
			.map((l) => l.trimEnd())
			.join("\n")
	}

	public reset() {
		// this.getEnv().reset()
		this.getEnv().errors = []
		this.setCode(this.code)
		this.getEnv().emit("update")
	}

	//@ts-ignore TODO
	public getEnv() {
		return this.env as Env
	}

	async run(codeLines?: number, dryRun?: number) {
		this.reset()
		return await super.run(codeLines, dryRun)
	}
}

declare global {
	interface Window {
		ic10: Ic10
	}
}
window.ic10 = Ic10.getInstance()
export default Ic10.getInstance()
