<script lang="ts">
	import '@fontsource-variable/geist-mono';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style lang="scss">
	:global(body) {
		font-family: 'Geist Mono Variable', monospace;
	}
</style>
