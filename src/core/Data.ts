import { z } from "zod"

export const Slot = z.object({
	SlotName: z.string(),
	SlotType: z.string(),
	SlotIndex: z.number(),
	logic: z.array(z.string()),
})

export const Device = z
	.object({
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
		logics: z.array(
			z.object({
				name: z.string(),
				permissions: z.array(z.string()),
			}),
		),
	})
	.passthrough()
export const Devices = z.array(Device)
export type Device = z.infer<typeof Device>
export type Devices = z.infer<typeof Devices>
export const Images = z.record(z.string())
export type Images = z.infer<typeof Images>

export const Item = z
	.object({
		id: z.number(),
		wiki_id: z.number(),
		Key: z.string(),
		PrefabName: z.string(),
		PrefabHash: z.number(),
		StackSize: z.number(),
		image: z.string().url().nullable(),
		tags: z.array(z.string()),
	})
	.passthrough()
export const Items = z.array(Item)
export type Item = z.infer<typeof Item>
export type Items = z.infer<typeof Items>

export const Reagent = z
	.object({
		name: z.string(),
		hash: z.number(),
		image: z.string(),
		items: z.array(z.object({
			name: z.string(),
			image: z.string(),
			count: z.number(),
		})),
	})
	.passthrough()
export const Reagents = z.array(Reagent)
export type Reagent = z.infer<typeof Reagent>
export type Reagents = z.infer<typeof Reagents>
export class Data {
	private static instance: Data
	private static reagents?: any
	private static devices?: any
	private static images?: any
	private static items?: any

	static getInstance() {
		if (!this.instance) {
			this.instance = new Data()
		}
		return this.instance
	}

	private constructor() {}

	async getDevices(): Promise<Devices> {
		if (Data.devices === undefined) {
			const response = await (await fetch("https://gist.githubusercontent.com/Traineratwot/79ec885420d814eea07c4a8496e00159/raw/devices.en.json")).json()
			Data.devices = response.data
			Data.images = response.images
		}
		return Devices.parse(Data.devices)
	}

	async getImages(): Promise<Images> {
		if (Data.images === undefined) {
			const response = await (await fetch("https://gist.githubusercontent.com/Traineratwot/79ec885420d814eea07c4a8496e00159/raw/devices.en.json")).json()
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

	async getReagents(): Promise<Reagents> {
		if (Data.reagents === undefined) {
			Data.reagents = (await (await fetch("https://gist.githubusercontent.com/Traineratwot/79ec885420d814eea07c4a8496e00159/raw/reagents.en.json")).json()).data
		}
		return Reagents.parse(Data.reagents)
	}
}

export default Data.getInstance()
