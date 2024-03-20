import {InterpreterIc10} from "ic10";
import Env from "./Env.ts";

export class Ic10 extends InterpreterIc10 {
	private static instance: Ic10;

	static getInstance() {
		if (!this.instance) {
			this.instance = new Ic10();
		}
		return this.instance
	}

	private constructor() {
		super(new Env, "");
	}

	setCode(code: string): this {
		this.getEnv().lines = []
		return super.setCode(code);
	}

	public reset() {
		// this.getEnv().reset()
		this.getEnv().setPosition(0)
		this.setCode(this.code)
		// @ts-ignore
		this.getEnv().emit('update')
	}

	public getEnv(): Env {
		return this.env as Env
	}

	async run(codeLines?: number, dryRun?: number): Promise<string> {
		this.reset()
		return await super.run(codeLines, dryRun);
	}
}

// @ts-ignore
window.ic10 = Ic10.getInstance()
export default Ic10.getInstance()
