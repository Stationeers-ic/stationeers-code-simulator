import {z} from "zod";

export const Slot = z.object({
	SlotName: z.string(),
	SlotType: z.string(),
	SlotIndex: z.number(),
	logic: z.array(z.string())
})

export const Device = z.object({
	id: z.number(),
	wiki_id: z.number(),
	Key: z.string(),
	PrefabName: z.string(),
	PrefabHash: z.number(),
	hasChip: z.boolean(),
	deviceConnectCount: z.number(),
	image: z.string().url().nullable(),
	mods: z.array(z.string()),
	connections: z.array(z.string()),
	slots: z.array(Slot),
	tags: z.array(z.string()),
	logics: z.array(z.object({
		name: z.string(),
		permissions: z.array(z.string())
	}))
}).passthrough()
export const Devices = z.array(Device)
export type Device = z.infer<typeof Device>
export type Devices = z.infer<typeof Devices>
export const Images = z.record(z.string())
export type Images = z.infer<typeof Images>

export const Item = z.object({
	id: z.number(),
	wiki_id: z.number(),
	Key: z.string(),
	PrefabName: z.string(),
	PrefabHash: z.number(),
	StackSize: z.number(),
	image: z.string().url().nullable(),
	tags: z.array(z.string()),
}).passthrough()
export const Items = z.array(Item)
export type Item = z.infer<typeof Item>
export type Items = z.infer<typeof Items>

export class Data {
	private static instance: Data;
	private static devices?: any;
	private static images?: any;
	private static items?: any;


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
			const response = (await (await fetch("https://gist.githubusercontent.com/Traineratwot/79ec885420d814eea07c4a8496e00159/raw/devices.en.json")).json())
			Data.devices = response.data
			Data.images = response.images
		}
		return Devices.parse(Data.devices)
	}

	async getimages(): Promise<Images> {
		if (Data.images === undefined) {
			const response = (await (await fetch("https://gist.githubusercontent.com/Traineratwot/79ec885420d814eea07c4a8496e00159/raw/devices.en.json")).json())
			Data.devices = response.data
			Data.images = response.images
		}
		return Images.parse(Data.images)
	}

	async getItems(): Promise<Items> {
		if (Data.items === undefined) {
			Data.items = (await (await fetch("https://gist.githubusercontent.com/Traineratwot/79ec885420d814eea07c4a8496e00159/raw/items.en.json")).json()).data
		}
		return Items.parse(Data.items)
	}


}

export default Data.getInstance()
