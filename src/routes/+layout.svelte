<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="bg-black fixed w-[100%] h-[100%]">
	{@render children()}
</div>

<style>
	div {
		background-image: url('$lib/img/noise.svg');
		background-size: 100%;
	}
</style>