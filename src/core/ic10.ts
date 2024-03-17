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

	public reset() {
		this.setEnv(new Env())
	}

	public getEnv(): Env {
		return this.env as Env
	}

	async run(codeLines?: number, dryRun?: number): Promise<string> {
		this.env.setPosition(0)
		this.setEnv(this.env)
		return await super.run(codeLines, dryRun);
	}
}
// @ts-ignore
window.ic10 = Ic10.getInstance()
export default Ic10.getInstance()
