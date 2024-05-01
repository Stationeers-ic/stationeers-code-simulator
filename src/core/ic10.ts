import { InterpreterIc10 } from "ic10"
import Env from "./Env.ts"
import { reactive, UnwrapNestedRefs } from "vue"

export class Ic10 extends InterpreterIc10<UnwrapNestedRefs<Env>> {
	private static instance: Ic10

	static getInstance() {
		if (!this.instance) {
			this.instance = new Ic10()
		}
		return this.instance
	}

	private constructor() {
		const env = reactive(new Env())
		super(env, "")
	}

	setCode(code: string): this {
		this.getEnv().lines = []
		super.setCode(code)
		this.parseCode()
		this.getEnv().prepare()
		this.getEnv().emit("update_code")
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

	public getEnv() {
		return this.env
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
