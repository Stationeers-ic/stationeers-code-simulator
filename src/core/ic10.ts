import {InterpreterIc10} from "ic10"
import Env from "./Env.ts"
import {reactive} from "vue"

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
		localStorage.setItem("code", code)
		this.getEnv().emit("update_code")
		this.getEnv().prepare()
		return this
	}

	public reset() {
		// this.getEnv().reset()
		this.getEnv().errors = []
		this.setCode(this.code)
		this.getEnv().emit("update")
	}

	public getEnv(): Env {
		return this.env as Env
	}

	async run(codeLines?: number, dryRun?: number): Promise<string> {
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
