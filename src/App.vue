<script setup lang="ts">
</script>

<template>
	<div class="container">
		<div class="code">
			<div class="errors"></div>
			<div class="code-mirror"></div>
		</div>
		<div class="side">
			<div class="control"></div>
			<div class="register"></div>
			<div class="stack"></div>
		</div>
		<div class="bottom">
			<div class="raw"></div>
			<div class="devises"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.container {
	min-height: 100vh;
	display: grid;
	grid-template-columns: 1.5fr 0.5fr;
	grid-template-rows: 1.3fr 0.7fr;
	gap: 0 0;
	grid-auto-flow: row;
	grid-template-areas:
    "code side"
    "bottom bottom";

	.code {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1.6fr 0.4fr;
		gap: 0 0;
		grid-auto-flow: row;
		grid-template-areas:
    "code-mirror"
    "errors";
		grid-area: code;

		.errors {
			grid-area: errors;
		}

		.code-mirror {
			grid-area: code-mirror;
		}
	}

	.side {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 0.4fr 2fr 0.6fr;
		gap: 0 0;
		grid-auto-flow: row;
		grid-template-areas:
    "control"
    "register"
    "stack";
		grid-area: side;

		.control {
			grid-area: control;
		}

		.register {
			grid-area: register;
		}

		.stack {
			grid-area: stack;
		}
	}

	.bottom {
		display: grid;
		grid-template-columns: 1.5fr 0.5fr;
		grid-template-rows: 1fr;
		gap: 0 0;
		grid-auto-flow: row;
		grid-template-areas:
    "devises raw";
		grid-area: bottom;

		.raw {
			grid-area: raw;
		}

		.devises {
			grid-area: devises;
		}
	}
}


</style>
