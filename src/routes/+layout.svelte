<script>
	import '../app.css';

	let { children } = $props();
</script>

<div class="bg-black fixed w-[100%] h-[100%]">
	{@render children()}
</div>
