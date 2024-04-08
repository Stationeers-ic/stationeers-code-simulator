import { driver, DriveStep } from "driver.js"
import delay from "delay"

let driverObj: ReturnType<typeof driver>
function init() {
	const t = window.i18n.global.t
	const controls: DriveStep[] = [
		{ element: "#tour-run", popover: { title: t("tutorial.iCSimulation.title"), description: t("tutorial.iCSimulation.description"), side: "bottom", align: "center" } },
		{ element: "#speedControl", popover: { title: t("tutorial.speedControl.title"), description: t("tutorial.speedControl.description"), side: "bottom", align: "center" } },
		{ element: "#tour-step", popover: { title: t("tutorial.manualControls.title"), description: t("tutorial.manualControls.description"), side: "bottom", align: "center" } },
		{
			element: "#tour-goto",
			popover: { title: t("tutorial.manualControls.title"), description: t("tutorial.manualControls.description"), side: "bottom", align: "center" },
		},
		{
			element: "#tour-reset",
			popover: {
				title: t("tutorial.manualControls.title"),
				description: t("tutorial.manualControls.description"),
				side: "bottom",
				align: "center",
			},
		},
	]
	const saveSystem: DriveStep[] = [
		{
			element: "#tour-File",
			popover: {
				title: t("tutorial.fileMenu.title"),
				description: t("tutorial.fileMenu.description"),
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
			popover: { title: t("tutorial.save.title"), description: t("tutorial.save.description"), side: "left", align: "center" },
		},
		{
			element: "#FileMenu_1",
			popover: {
				title: t("tutorial.saveAs.title"),
				description: t("tutorial.saveAs.description"),
				side: "left",
				align: "center",
			},
		},
		{
			element: "#FileMenu_2",
			popover: { title: t("tutorial.open.title"), description: t("tutorial.open.description"), side: "left", align: "center" },
		},
		{ element: "#FileMenu_3", popover: { title: t("tutorial.load.title"), description: t("tutorial.load.description"), side: "left", align: "center" } },
		{
			element: "#FileMenu_5",
			popover: {
				title: t("tutorial.share.title"),
				description: t("tutorial.share.description"),
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
				title: t("tutorial.iCSimulation.title"),
				description: t("tutorial.iCSimulation.description"),
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
				title: t("tutorial.addDevice.title"),
				description: t("tutorial.addDevice.description"),
				side: "top",
				align: "center",
			},
		},
		{
			element: "#deviceName",
			popover: {
				title: t("tutorial.labeler.title"),
				description: t("tutorial.labeler.description"),
				side: "top",
				align: "center",
			},
		},
		{ element: "#devicePin", popover: { title: t("tutorial.pinD0-D5.title"), description: t("tutorial.pinD0-D5.description"), side: "top", align: "center" } },
		{
			element: "#deviceId",
			popover: {
				title: t("tutorial.deviceID.title"),
				description: t("tutorial.deviceID.description"),
				side: "bottom",
				align: "center",
			},
		},
		{
			element: "#tourAddDeviceAdd",
			popover: {
				title: t("tutorial.addDevice.title"),
				description: t("tutorial.addDevice.description"),
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
			popover: { title: t("tutorial.codeEditor.title"), description: t("tutorial.codeEditor.description"), side: "top", align: "start" },
		},
		{
			element: "#tour-code-ic10 .register >  div:nth-child(2)",
			popover: { title: t("tutorial.registersView.title"), description: t("tutorial.registersView.description"), side: "right", align: "start" },
		},
		{
			element: "#tour-code-ic10 .register >  div:nth-child(4)",
			popover: {
				title: t("tutorial.constantsView.title"),
				description: t("tutorial.constantsView.description"),
				side: "right",
				align: "start",
			},
		},
		{ element: "#tour-code-ic10 .errors ", popover: { title: t("tutorial.errorLog.title"), description: t("tutorial.errorLog.description"), side: "top", align: "start" } },
	]
	const device: DriveStep[] = [
		{
			element: "#tour-devises > div > div",
			popover: {
				title: t("tutorial.simulationEnvironment.title"),
				description: t("tutorial.simulationEnvironment.description"),
				side: "top",
				align: "center",
			},
		},
		{
			element: '#tour-devises div[data-pc-section="title"]',
			popover: { title: t("tutorial.devicePrefabName.title"), description: t("tutorial.devicePrefabName.description"), side: "left", align: "center" },
		},
		{
			element: '#tour-devises div[data-pc-section="subtitle"]',
			popover: { title: t("tutorial.deviceName.title"), description: t("tutorial.deviceName.description"), side: "left", align: "center" },
		},
		{
			element: "#tour-devises .device-ports",
			popover: { title: t("tutorial.pinsAndAliases.title"), description: t("tutorial.pinsAndAliases.description"), side: "left", align: "center" },
		},
		{
			element: "#tour-devises .device-props",
			popover: {
				title: t("tutorial.deviceProperties.title"),
				description: t("tutorial.deviceProperties.description"),
				side: "left",
				align: "center",
			},
		},
		{
			element: "#tour-devises .device-new-prop",
			popover: {
				title: t("tutorial.deviceVariables.title"),
				description: t("tutorial.deviceVariables.description"),
				side: "left",
				align: "center",
			},
		},
		{
			element: "#tour-devises .device-slots",
			popover: { title: t("tutorial.slots.title"), description: t("tutorial.slots.description"), side: "left", align: "center" },
		},
		{
			element: "#tour-devises .device-remove",
			popover: { title: t("tutorial.remove.title"), description: t("tutorial.remove.description"), side: "left", align: "center" },
		},
	]
	const steps: DriveStep[] = [
		{
			element: "#tour-headers",
			popover: { title: t("tutorial.tutorial.title"), description: t("tutorial.tutorial.description"), side: "bottom", align: "center" },
		},
		...saveSystem,
		...controls,
		...AddDevice,
		{
			element: "#hashConverter",
			popover: { title: t("tutorial.converter.title"), description: t("tutorial.converter.description"), side: "bottom", align: "center" },
		},
		...body,
		...device,
		{
			element: "#ResetAll",
			popover: {
				title: t("tutorial.delete.title"),
				description: t("tutorial.delete.description"),
				side: "bottom",
				align: "center",
			},
		},
	]
	return (driverObj = driver({
		showProgress: true,
		smoothScroll: true,
		steps,
		onDestroyStarted: () => {
			if (!driverObj.hasNextStep() || confirm("Are you sure you want to end the tutorial?")) {
				driverObj.destroy()
			}
		},
	}))
}
export function start() {
	init().drive()
}
