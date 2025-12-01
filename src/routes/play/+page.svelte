<script lang="ts">
	import { page } from '$app/state';
	import type { MouseEventHandler } from 'svelte/elements';
	import Cell from './Cell.svelte';
	import { defaultPuzzle } from './puzzleBank';
	import { actives } from './play.svelte';

	const puzzle = page.url.searchParams.get('puzzle') ?? defaultPuzzle;

	const n = puzzle.split('');
	console.log(n);

	if (n.length != 81) {
		console.error('Error with puzzle');
	}

	const toggleAutoCandidate: MouseEventHandler<HTMLButtonElement> = () => {
		actives.update((v) => {
			v.autoCandidate = true;
			return v;
		});
	};
</script>

<div class="cells">
	{#each n as item, index (index)}
		<Cell val={item} {index} />
	{/each}
</div>

<button onclick={toggleAutoCandidate}> Auto Candidate </button>

<style lang="scss">
	.cells {
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		grid-template-rows: repeat(9, 1fr);
		aspect-ratio: 1/1;
		background: black;
		gap: 1px;
		border: 1px solid black;
		max-height: 80dvh;
		max-width: 80vw;
	}
</style>
