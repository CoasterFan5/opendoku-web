<script lang="ts">
	import { getIndexesFromIndex } from './getIndexesFromIndex';
	import { actives, puzzleState } from './play.svelte';
	import type { KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';

	let {
		val = $bindable(''),
		index
	}: {
		val: string;
		index: number;
	} = $props();

	const locked = val != '0';
	let realNumber = $derived(val != '0');
	let placedValue = $state(false);
	let isError = $state(false);

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

	const inputHandler: KeyboardEventHandler<HTMLButtonElement> = (e) => {
		isError = false;
		if (locked) {
			return;
		}

		let p = parseInt(e.key);

		if (e.key == 'Backspace') {
			p = 0;
		}

		if (!isNaN(p)) {
			val = `${p}`;
			if (!puzzleState.setValue(index, p)) {
				console.error('Invalid Place');
				isError = true;
				return;
			}

			candidates = [];

			if (p === 0) {
				placedValue = false;
			} else {
				placedValue = true;
			}

			actives.update((v) => {
				v.autoCandidate = true;
				return v;
			});
		}
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

<button
	class="cell"
	class:active
	class:semiActive
	onclick={clickHandler}
	onkeydown={inputHandler}
	class:rightBorder={(index + 1) % 3 == 0}
	class:leftBorder={index % 3 == 0}
	class:bottomBorder={(Math.floor(index / 9) + 1) % 3 == 0}
	class:topBorder={Math.floor(index / 9) % 3 == 0}
	class:placed={placedValue}
	class:error={isError}
>
	{#if realNumber}
		{val}
	{:else}
		<grid class="candidates">
			{#each candidates as cand, i (i)}
				<div class="candidate" class:activeCadidate={$actives.value == `${cand}`}>
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
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		border: 0.5px solid rgba(0, 0, 0, 0.25);
	}

	.rightBorder {
		border-right: 1px solid black;
	}

	.leftBorder {
		border-left: 1px solid black;
	}

	.bottomBorder {
		border-bottom: 1px solid black;
	}

	.topBorder {
		border-top: 1px solid black;
	}

	.placed {
		color: #ff960b;
	}

	.error {
		color: red !important;
	}

	.semiActive {
		background: color-mix(in srgb, 10% rgba(255, 167, 41, 1), 90% white);
	}

	.active {
		background: color-mix(in srgb, 50% rgba(255, 167, 41, 1), 50% white);
	}

	.candidates {
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);

		.candidate {
			aspect-ratio: 1/1;
			font-size: 0.8rem;
			margin: 0;
			opacity: 0.5;
			display: flex;
			align-items: center;
			justify-content: center;

			&.activeCadidate {
				opacity: 1;
				font-weight: bold;
			}
		}
	}
</style>
