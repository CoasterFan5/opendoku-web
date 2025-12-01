<script lang="ts">
	import { getIndexesFromIndex } from './getIndexesFromIndex';
	import { actives, puzzleState } from './play.svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	const {
		val,
		index
	}: {
		val: string;
		index: number;
	} = $props();

	let realNumber = $state(val != '0');

	let { rowIndex, colIndex, houseIndex } = getIndexesFromIndex(index);
	let candidates: number[] = $state([]);

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

		if (v.autoCandidate) {
			candidates = puzzleState.getCandidates(index);
		}
	});
</script>

<button class="cell" class:active class:semiActive onclick={clickHandler}>
	{#if realNumber}
		{val}
	{:else}
		<grid class="candidates">
			{#each candidates as cand, i (i)}
				<div class="candidate">
					{#if cand != 0}
						{cand}
					{/if}
				</div>
			{/each}
		</grid>
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
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);

		.candidate {
			aspect-ratio: 1/1;
			font-size: 0.9rem;
			opacity: 0.5;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
