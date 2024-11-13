import {z} from "zod"

export const Slot = z.object({
	SlotName: z.string(),
	SlotType: z.string(),
	SlotIndex: z.number(),
	logic: z.array(z.string()),
})

export const Device = z
	.object({
		Key: z.string(),
		Title: z.string(),
		PrefabName: z.string(),
		PrefabHash: z.number(),
		hasChip: z.boolean(),
		deviceConnectCount: z.number(),
		image: z
			.string()
			.transform((img) => "https://assets.ic10.dev/" + img)
			.nullable(),
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
export const Images = z.record(z.string().transform((img) => "https://assets.ic10.dev/" + img))
export type Images = z.infer<typeof Images>

export const Item = z
	.object({
		Title: z.string(),
		Key: z.string(),
		PrefabName: z.string(),
		PrefabHash: z.number(),
		StackSize: z.number().nullable(),
		image: z
			.string()
			.transform((img) => "https://assets.ic10.dev/" + img)
			.nullable(),
		tags: z.array(z.string()),
	})
	.passthrough()
export const Items = z.array(Item)
export type Item = z.infer<typeof Item>
export type Items = z.infer<typeof Items>

export const Reagent = z
	.object({
		title: z.string(),
		name: z.string(),
		hash: z.number(),
		image: z
			.string()
			.nullable()
			.transform((img) => (img ? "https://assets.ic10.dev/" + img : null)),
		items: z.array(
			z.object({
				title: z.string(),
				name: z.string(),
				hash: z.number(),
				image: z
					.string()
					.nullable()
					.transform((img) => (img ? "https://assets.ic10.dev/" + img : null)),
				count: z.number(),
			}),
		),
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
	private static instructions?: any

	private constructor() {}

	static getUrl(path: string) {
		const languages = ["CN", "CS", "DA", "DE", "EN", "ES", "FI", "FR", "HU", "IT", "KN", "KO", "NL", "PB", "PL", "PT", "RO", "RU", "SK", "TR", "TW"]
		const lang = languages.indexOf(window.userLang.toUpperCase()) !== -1 ? window.userLang.toUpperCase() : "EN"
		return `https://assets.ic10.dev/languages/${lang}/${path}.json`
	}

	static reset() {
		Data.reagents = undefined
		Data.devices = undefined
		Data.images = undefined
		Data.items = undefined
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new Data()
		}
		return this.instance
	}

	async getDevices(): Promise<Devices> {
		if (Data.devices === undefined) {
			const response = await (await fetch(Data.getUrl(`devices`))).json()
			Data.devices = response.data
			Data.images = response.images
		}
		return Devices.parse(Data.devices)
	}

	async getImages(): Promise<Images> {
		if (Data.images === undefined) {
			const response = await (await fetch(Data.getUrl(`devices`))).json()
			Data.devices = response.data
			Data.images = response.images
		}
		return Images.parse(Data.images)
	}

	async getItems(): Promise<Items> {
		if (Data.items === undefined) {
			Data.items = (await (await fetch(Data.getUrl(`items`))).json()).data
		}
		return Items.parse(Data.items)
	}

	async getReagents(): Promise<Reagents> {
		if (Data.reagents === undefined) {
			Data.reagents = (await (await fetch(Data.getUrl(`reagents`))).json()).data
		}
		return Reagents.parse(Data.reagents)
	}
	async getInstructions(): Promise<any> {
		if(Data.instructions === undefined) {
			Data.instructions = (await (await fetch(Data.getUrl(`instructions`))).json())
		}
		return Data.instructions;
	}
}

export default Data.getInstance()
