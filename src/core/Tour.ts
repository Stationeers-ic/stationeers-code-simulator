import { driver, DriveStep } from "driver.js"
import delay from "delay"

const controls: DriveStep[] = [
	{ element: "#tour-headers", popover: { title: "Controls", description: "Control panel. That panel will follow you", side: "bottom", align: "center" } },
	{ element: "#hashConverter", popover: { title: "Controls", description: "Small tool for convert string to crc32 Hash", side: "bottom", align: "center" } },
	{ element: "#tour-run", popover: { title: "Controls", description: "Run/Stop code with delay", side: "bottom", align: "center" } },
	{ element: "#speedControl", popover: { title: "Controls", description: "You can change speed run code", side: "bottom", align: "center" } },
	{ element: "#tour-step", popover: { title: "Controls", description: "Run next Line", side: "bottom", align: "center" } },
	{ element: "#tour-goto", popover: { title: "Controls", description: "Run from current line to first <b>yield</b> instruction", side: "bottom", align: "center" } },
	{
		element: "#tour-reset",
		popover: { title: "Controls", description: "Clear registers and current line position. It`s like remove ic10 chip from housing and put again", side: "bottom", align: "center" },
	},
]

const saveSystem: DriveStep[] = [
	{
		element: "#tour-File",
		popover: {
			title: "Save system",
			description: "This button open sub menu. You can save and share the code and environment",
			side: "bottom",
			align: "start",
			onNextClick: async () => {
				document.querySelector<HTMLButtonElement>("#tour-File")?.click()
				await delay(100)
				driverObj.moveNext()
			},
		},
	},
	{ element: "#FileMenu_0", popover: { title: "Save system", description: "save file in browser memory", side: "left", align: "center" } },
	{ element: "#FileMenu_1", popover: { title: "Save system", description: "Opens a dialog where you can specify a file name and save it to a file", side: "left", align: "center" } },
	{
		element: "#FileMenu_2",
		popover: { title: "Save system", description: "Opens a dialog where you can download the code from a file or a special string", side: "left", align: "center" },
	},
	{ element: "#FileMenu_3", popover: { title: "Save system", description: "Opens a sidebar where you can manage your saves", side: "left", align: "center" } },
	{
		element: "#FileMenu_5",
		popover: {
			title: "Save system",
			description: "Copy in clipboard share link",
			side: "left",
			align: "center",
			onNextClick: async () => {
				document.querySelector<HTMLButtonElement>("#tour-File")?.click()
				await delay(100)
				driverObj.moveNext()
			},
		},
	},
]

const AddDevice: DriveStep[] = [
	{
		element: "#AddDevice",
		popover: {
			title: "Controls",
			description: "Add new device in environment",
			side: "bottom",
			align: "center",
			onNextClick: async () => {
				document.querySelector<HTMLButtonElement>("#AddDevice")?.click()
				await delay(200)
				driverObj.moveNext()
			},
		},
	},
	{
		element: "#deviceHash",
		popover: { title: "Add device", description: "You must write Select device list from OR <b>PrefabName</b> or <b>PrefabHash</b>", side: "top", align: "center" },
	},
	{ element: "#deviceName", popover: { title: "Add device", description: "You can write device name, like use <b>Labeller</b>", side: "top", align: "center" } },
	{ element: "#devicePin", popover: { title: "Add device", description: "You can connect device to Pin d0-5", side: "top", align: "center" } },
	{ element: "#deviceId", popover: { title: "Add device", description: "You can write id device for instruction like  <b>ld</b> or <b>putd</b>", side: "bottom", align: "center" } },
	{
		element: "#tourAddDeviceAdd",
		popover: {
			title: "Add device",
			description: "Don't forget to click to add",
			side: "top",
			align: "center",
			onNextClick: async () => {
				document.querySelector<HTMLButtonElement>("#tourAddDeviceCancel")?.click()
				await delay(200)
				driverObj.moveNext()
			},
		},
	},
]
const body: DriveStep[] = [
	{ element: "#tour-code-ic10 .cm-editor", popover: { title: "Code", description: "Write on ic10 here", side: "top", align: "start" } },
	{
		element: "#tour-code-ic10 .register >  div:nth-child(2)",
		popover: { title: "Register", description: "Here you can see and change registers in memory", side: "right", align: "start" },
	},
	{ element: "#tour-code-ic10 .register >  div:nth-child(4)", popover: { title: "Constants", description: "Here you can see constants and labels", side: "right", align: "start" } },
	{ element: "#tour-code-ic10 .errors ", popover: { title: "Constants", description: "Error log", side: "top", align: "start" } },
]

const device: DriveStep[] = [
	{ element: "#tour-devises > div > div", popover: { title: "Constants", description: "Device card", side: "top", align: "center" } },
	{ element: '#tour-devises div[data-pc-section="title"]', popover: { title: "Constants", description: "Device PrefabName", side: "left", align: "center" } },
	{ element: '#tour-devises div[data-pc-section="subtitle"]', popover: { title: "Constants", description: "Device Name from <b>Labeller</b>", side: "left", align: "center" } },
	{ element: "#tour-devises .device-ports", popover: { title: "Constants", description: "List ports and aliases", side: "left", align: "center" } },
	{ element: "#tour-devises .device-props", popover: { title: "Constants", description: "List exists device props", side: "left", align: "center" } },
	{ element: "#tour-devises .device-new-prop", popover: { title: "Constants", description: "You can add new prop", side: "left", align: "center" } },
	{ element: "#tour-devises .device-slots", popover: { title: "Constants", description: "You can manage slots in device", side: "left", align: "center" } },
	{ element: "#tour-devises .device-remove", popover: { title: "Constants", description: "You can remove device from environment", side: "left", align: "center" } },
]

const driverObj = driver({
	showProgress: true,
	smoothScroll: true,
	steps: [...controls, ...saveSystem, ...AddDevice, ...body, ...device],

	onDestroyStarted: () => {
		if (!driverObj.hasNextStep() || confirm("Are you sure?")) {
			driverObj.destroy()
		}
	},
})

export function start() {
	driverObj.drive()
}
