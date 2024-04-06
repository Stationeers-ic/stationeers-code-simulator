import { driver, DriveStep } from "driver.js"
import delay from "delay"

const controls: DriveStep[] = [

	{ element: "#tour-run", popover: { title: "IC Simulation", description: "Start/Pause the IC code simulation at a low pace.", side: "bottom", align: "center" } },
	{ element: "#speedControl", popover: { title: "Speed control", description: "Adjust the simulation speed here.", side: "bottom", align: "center" } },
	{ element: "#tour-step", popover: { title: "Manual controls", description: "Execute one step of the code manually.", side: "bottom", align: "center" } },
	{
		element: "#tour-goto",
		popover: { title: "Manual controls", description: "Execute all instructions from the current line to the next <b>yield</b> instruction.", side: "bottom", align: "center" },
	},
	{
		element: "#tour-reset",
		popover: {
			title: "Manual controls",
			description: "Clear all registers and reset the execution to the first line, simulating removing and placing back the IC chip.",
			side: "bottom",
			align: "center",
		},
	},

]
const saveSystem: DriveStep[] = [
	{
		element: "#tour-File",
		popover: {
			title: "File menu",
			description: "Save, export, or load an IC code and its associated devices from this menu.",
			side: "bottom",
			align: "start",
			onNextClick: async () => {
				document.querySelector<HTMLButtonElement>("#tour-File")?.click()
				await delay(100)
				driverObj.moveNext()
			},
		},
	},
	{
		element: "#FileMenu_0",
		popover: { title: "Save", description: "Save the current code in the browser memory.<br />For a new code, use the next button (Save As).", side: "left", align: "center" },
	},
	{
		element: "#FileMenu_1",
		popover: {
			title: "Save as",
			description:
				"Save a new code in the browser memory and assign it a name.<br />Additionally, this button provides the option to export your code and devices to your local machine or generate a shareable link.",
			side: "left",
			align: "center",
		},
	},
	{
		element: "#FileMenu_2",
		popover: { title: "Open", description: "Open an IC code from a file, restore a previously exported code, or open it from a shared link.", side: "left", align: "center" },
	},
	{ element: "#FileMenu_3", popover: { title: "Load", description: "List and access all saved codes in the browser memory.", side: "left", align: "center" } },
	{
		element: "#FileMenu_5",
		popover: {
			title: "Share",
			description: "Generate and copy a link to share your IC code and simulation environment settings.",
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
			title: "IC Simulation",
			description: "Here you can add devices to your simulation environment.<br />Let's see it in details.",
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
		popover: {
			title: "Add device",
			description: "To begin, specify the device you wish to include. You can choose from the list or manually input its <b>PrefabName</b> or <b>PrefabHash</b>",
			side: "top",
			align: "center",
		},
	},
	{
		element: "#deviceName",
		popover: {
			title: "Labeler",
			description: "Similar to the game, assign a distinct name to each device.<br />This enables the simulation of batch named commands.",
			side: "top",
			align: "center",
		},
	},
	{ element: "#devicePin", popover: { title: "Pin d0-d5", description: "Or simply determine the pin to which the device will connect.", side: "top", align: "center" } },
	{
		element: "#deviceId",
		popover: {
			title: "Device ID",
			description:
				"Optionally, specify a ReferenceID for use with <b>ld</b>, <b>sd</b>, <b>putd</b>, or <b>getd</b> instructions.<br />You can locate this ID in-game using a Configuration card on your tablet.",
			side: "bottom",
			align: "center",
		},
	},
	{
		element: "#tourAddDeviceAdd",
		popover: {
			title: "Add device",
			description: "Once the device is configured, click here to add it into your simulation environment.",
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
	{
		element: "#tour-code-ic10 .cm-editor",
		popover: { title: "Code editor", description: "Here, you can either write your IC code or copy-paste existing code.", side: "top", align: "start" },
	},
	{
		element: "#tour-code-ic10 .register >  div:nth-child(2)",
		popover: { title: "Registers view", description: "Monitor and manually adjust all registers during the simulation.", side: "right", align: "start" },
	},
	{
		element: "#tour-code-ic10 .register >  div:nth-child(4)",
		popover: {
			title: "Constants view",
			description: "Access a list of default constants defined by the IC10, along with labels (line number) or constants specified within your code.",
			side: "right",
			align: "start",
		},
	},
	{ element: "#tour-code-ic10 .errors ", popover: { title: "Error log", description: "Any code execution errors will be recorded here.", side: "top", align: "start" } },
]
const device: DriveStep[] = [
	{
		element: "#tour-devises > div > div",
		popover: {
			title: "Simulation environment",
			description: "Each device added to the environment is represented by a card, providing a visual overview of your setup.",
			side: "top",
			align: "center",
		},
	},
	{
		element: '#tour-devises div[data-pc-section="title"]',
		popover: { title: "Device PrefabName", description: "This is the device type as defined by the Stationpedia.", side: "left", align: "center" },
	},
	{
		element: '#tour-devises div[data-pc-section="subtitle"]',
		popover: { title: "Device Name", description: "Review the custom name assigned to the device using the <b>Labeler</b>.", side: "left", align: "center" },
	},
	{
		element: "#tour-devises .device-ports",
		popover: { title: "Pins and aliases", description: "Check all pins and aliases associated with the device in your code.", side: "left", align: "center" },
	},
	{
		element: "#tour-devises .device-props",
		popover: {
			title: "Device properties",
			description: "Access properties generated from the configured device, including its Reference ID, Prefab name, and Labelled name.",
			side: "left",
			align: "center",
		},
	},
	{
		element: "#tour-devises .device-new-prop",
		popover: {
			title: "Device Variables",
			description: "Monitor and edit variables and their values set by the code, with the option to manually add new variables from a list.",
			side: "left",
			align: "center",
		},
	},
	{
		element: "#tour-devises .device-slots",
		popover: { title: "Slots", description: "Each slot of the device is displayed, allowing you to edit slot variables by clicking on them.", side: "left", align: "center" },
	},
	{
		element: "#tour-devises .device-remove",
		popover: { title: "Remove", description: "Use this option to remove a device from the simulation environment.", side: "left", align: "center" },
	},
]
const driverObj = driver({
	showProgress: true,
	smoothScroll: true,
	steps: [
		{
			element: "#tour-headers",
			popover: { title: "Tutorial", description: "Welcome to the Stationeers Code Simulator tutorial.<br />Let's go through the controls step by step.", side: "bottom", align: "center" },
		},
		...saveSystem,
		...controls,
		...AddDevice,
		{
			element: "#hashConverter",
			popover: { title: "Converter", description: "Generate a Hash using the CRC32 function from a name, as used in Stationeers.", side: "bottom", align: "center" },
		},
		...body,
		...device,
		{
			element: "#ResetAll",
			popover: {
				title: "Delete",
				description: "Click here to reset everything and start with a fresh simulation.<br />Be aware that this action will also <b>erase all your saved codes</b>!",
				side: "bottom",
				align: "center",
			},
		},
	],

	onDestroyStarted: () => {
		if (!driverObj.hasNextStep() || confirm("Are you sure you want to end the tutorial?")) {
			driverObj.destroy()
		}
	},
})

export function start() {
	driverObj.drive()
}
