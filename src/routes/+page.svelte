<script lang="ts">
	import { resolve } from '$app/paths';

	let puzzleValue = $state('');
</script>

<h1>Alpha?</h1>
<p>Use /play?puzzle=(81 numbers)</p>

<input placeholder="puzzle" bind:value={puzzleValue} />
<a href="{resolve('/play')}?puzzle={puzzleValue}">Go</a>
