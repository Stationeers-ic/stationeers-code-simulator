import {z} from "zod";

export const Device = z.object({
	id: z.number(),
	wiki_id: z.number(),
	Key: z.string(),
	PrefabName: z.string(),
	PrefabHash: z.number(),
	hasChip: z.boolean(),
	deviceConnectCount: z.number(),
	image: z.string().nullable(),
	mods: z.array(z.string()),
	connections: z.array(z.string()),
	slots: z.array(z.object({
		SlotName: z.string(),
		SlotType: z.string(),
		SlotIndex: z.number(),
		logic: z.array(z.string())
	})),
	tags: z.array(z.string()),
	logics: z.array(z.object({
		name: z.string(),
		permissions: z.array(z.string())
	}))
}).passthrough()
export const Devices = z.array(Device)
export type Device = z.infer<typeof Device>
export type Devices = z.infer<typeof Devices>

export class Data {
	private static instance: Data;
	private static devices?: any;


	static getInstance() {
		if (!this.instance) {
			this.instance = new Data();
		}
		return this.instance
	}

	private constructor() {
	}

	async getDevices(): Promise<Devices> {
		if (Data.devices === undefined) {
			Data.devices = (await (await fetch("https://gist.githubusercontent.com/Traineratwot/79ec885420d814eea07c4a8496e00159/raw/c5d15d0fb1b8d9a9746c834e1ed132828cf8bca1/devices.en.json")).json()).data
		}
		return Devices.parse(Data.devices)
	}


}

export default Data.getInstance()
