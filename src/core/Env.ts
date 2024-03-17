import {DevEnv} from "ic10";
import Line from "ic10/dist/core/Line";
import {reactive} from "vue";

class Env extends DevEnv {
	constructor() {
		super();
		this.data = reactive({})
		this.stack =  reactive([])
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
		return await new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve()
			}, 300)
		})
	}

}

export default Env;
