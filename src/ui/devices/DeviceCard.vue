<script setup lang="ts">
import ic10 from "../../core/ic10.ts"
import {getCurrentInstance, onBeforeUnmount, onMounted, ref} from "vue"
import data, {Device, Devices} from "../../core/Data.ts"
import DeviceProps from "./DeviceProps.vue"
import DevicePorts from "./DevicePorts.vue"
import DeviceSlots from "./Slots/DeviceSlots.vue"
import DeviceReagents from "./DeviceReagents.vue"
import Stack from "../../components/Stack.vue"

const props = defineProps<{
	id: string
	device: any
	isPin?: boolean
}>()
const emit = defineEmits(["pin"])

function buttonClick() {}

const image = ref("")
const CARD = ref()
const name = ref("")
const devicesData = ref<Devices>([])
const deviceData = ref<Device | undefined>(undefined)
const newKey = ref("")
const newVal = ref(0)
const instance = getCurrentInstance()

onMounted(async () => {
	devicesData.value = await data.getDevices()
	deviceData.value = devicesData.value.find((d) => d.PrefabHash === props.device.PrefabHash)
	image.value = deviceData.value?.image || "https://placehold.co/128?text=Unknown"
	name.value = ic10.getEnv().deviceNames.get(props.id) || ""
	ic10.getEnv().on("update", () => {
		instance?.proxy?.$forceUpdate()
	})
})

onBeforeUnmount(() => {
	ic10.getEnv().off("update")
})

function remove() {
	ic10.getEnv().removeDevice(props.id)
}

function add() {
	const d = ic10.getEnv().devices.get(props.id)
	if (d) {
		d[newKey.value] = newVal.value
	}
}

function pin() {
	emit("pin", props.id, CARD.value?.offsetWidth ?? 400)
}
</script>

<template>
	<div ref="CARD" :class="[$style.card, 'device-card']">
		<Card>
			<template #header>
				<div :class="$style.image">
					<Image loading="lazy" alt="user header" :src="image" />
					<Button v-if="!props.isPin" @click="pin" :class="$style.pin" icon="pi pi-arrow-up-right" severity="secondary" style="margin-top: 5px" />
				</div>
			</template>
			<template #title>
				<div :class="$style.break">{{ deviceData?.PrefabName }}</div>
			</template>
			<template #subtitle>
				<span :class="$style.break">{{ name || " " }}</span>
			</template>
			<template #content>
				<div class="device-ports">
					<DevicePorts :id="props.id" />
				</div>
				<TabView :lazy="true" :scrollable="true">
					<TabPanel :header="$t('props')">
						<template #header>
							<div class="device-header-props"></div>
						</template>
						<div class="device-props">
							<DeviceProps :id="props.id" :device="props.device" />
						</div>
						<Divider />
						<div class="device-new-prop">
							<InputGroup class="prop">
								<Dropdown
									editable
									filter
									class="key"
									v-model="newKey"
									placeholder="Key"
									:options="deviceData?.logics.filter((e) => props.device[e.name] === undefined)"
									option-label="name"
									option-value="name"
								>
									<template #option="slotProps">
										<div class="flex align-items-center gap-1">
											<i v-if="slotProps.option.permissions.includes('Write')" style="color: var(--primary-color)" class="pi pi-file-edit"></i>
											<i v-else class="pi pi-file" style="color: #fb923c"></i>
											<div :title="slotProps.option.name">{{ slotProps.option.name }}</div>
										</div>
									</template>
								</Dropdown>
								<InputNumber :minFractionDigits="0" :maxFractionDigits="20" class="val" :useGrouping="false" v-model="newVal" placeholder="Value" />
								<Button class="btn" @click="add" size="small" icon="pi pi-plus-circle" />
							</InputGroup>
						</div>
					</TabPanel>
					<TabPanel :header="$t('slots')" v-if="deviceData?.slots !== undefined">
						<template #header>
							<div class="device-header-slots"></div>
						</template>
						<div class="device-slots">
							<DeviceSlots :id="props.id" :device="props.device" :deviceData="deviceData" />
						</div>
					</TabPanel>
					<TabPanel :header="$t('stack.stack')" v-show="ic10.getEnv().devicesAttached.get(props.id) == 'db' || ic10.getEnv()?.devicesStack.has(props.id)">
						<template #header>
							<div class="device-header-stack"></div>
						</template>
						<div class="device-stack">
							<Stack :deviceId="props.id" :lines="20" />
						</div>
					</TabPanel>
					<TabPanel :header="$t('reagents')" v-if="deviceData?.logics.find((e) => e.name === 'Reagents')">
						<template #header>
							<div class="device-header-reagents"></div>
						</template>
						<div class="device-reagents">
							<DeviceReagents :id="props.id" :device="props.device" />
						</div>
					</TabPanel>
					<TabPanel :header="$t('networks')" v-if="deviceData?.connections?.length">
						<template #header>
							<div class="device-header-networks"></div>
						</template>
						soon
					</TabPanel>
					<TabPanel :header="$t('tags')" v-if="deviceData?.tags?.length">
						<template #header>
							<div class="device-header-tags"></div>
						</template>
						<p class="mt-1" style="color: var(--text-color-secondary)">
							<small>{{ $t("tags_description") }}</small>
						</p>
						<div>
							<Chip v-for="tag in deviceData?.tags" :key="tag" :label="tag" class="m-1" />
						</div>
					</TabPanel>
				</TabView>
			</template>
			<template #footer>
				<div class="flex gap-3 mt-1">
					<Button :label="$t('remove')" icon="pi pi-ban" @click="remove" severity="danger" outlined class="w-full device-remove" />
					<!--				<Button label="Save" class="w-full"/>-->
				</div>
			</template>
		</Card>
	</div>
</template>

<style module scoped lang="scss">
.card {
	$count: 3;
	overflow: hidden;
	width: calc(100% / $count - (2px * ($count - 1)));
}

.break {
	word-break: break-all;
}

.small {
	color: var(--text-color-secondary);
}

.image {
	position: relative;
	width: 100%;
	height: 128px;
	display: flex;
	justify-content: center;
}

.pin {
	position: absolute;
	right: 5px;
}
</style>

<style>
.device-card {
	.p-card-body {
		height: 100%;
	}
}
</style>
