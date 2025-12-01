<script lang="ts">
	import { actives } from './play.svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	const {
		val,
		index
	}: {
		val: string;
		index: number;
	} = $props();

	let realNumber = $state(val != '0');

	let rowIndex = Math.floor(index / 9);
	let colIndex = index % 9;
	let houseIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);

	const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
		let trueValue = realNumber ? val : '-1';

		actives.set({
			index: index,
			value: trueValue,
			row: rowIndex,
			col: colIndex,
			house: houseIndex,
			autoCandidate: false
		});
	};

	let active = $state(false);
	let semiActive = $state(false);

	actives.subscribe((v) => {
		if (v.index == index) {
			active = true;
		} else if (v.value == val) {
			active = true;
		} else {
			active = false;
		}

		if (v.row == rowIndex) {
			semiActive = true;
		} else if (v.col == colIndex) {
			semiActive = true;
		} else if (v.house == houseIndex) {
			semiActive = true;
		} else {
			semiActive = false;
		}
	});
</script>

<button class="cell" class:active class:semiActive onclick={clickHandler}>
	{#if realNumber}
		{val}
	{:else}
		<grid class="candidates"> </grid>
	{/if}
</button>

<style lang="scss">
	.cell {
		all: unset;
		width: 100%;
		height: 100%;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}

	.semiActive {
		background: color-mix(in srgb, 25% rgba(255, 167, 41, 1), 75% white);
	}

	.active {
		background: rgba(255, 167, 41, 1);
	}

	.candidates {
		grid-template-columns: auto(1fr, 3);
		grid-template-rows: auto(1fr, 3);
	}
</style>
