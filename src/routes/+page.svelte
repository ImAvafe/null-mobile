<script>
  import Throttle from '$lib/components/Throttle.svelte';
  import { throttleDrag, breakDrag } from '$lib/data/state.ts';

  breakDrag.subscribe((value) => {
    console.log(`break: ${value}`);
  });
  throttleDrag.subscribe((value) => {
    console.log(`throttle: ${value}`);
  });
</script>

<div class="flex flex-row min-h-screen h-screen [&>*]:flex-1">
  <Throttle onDrag={(value) => {
    breakDrag.set(value)
  }} />
  <div>
    <div class="w-full h-full flex items-center justify-center">
      <p class='text-white text-2xl'>100%</p>
    </div>
  </div>
  <Throttle onDrag={(value) => {
    throttleDrag.set(value)
  }} />
</div>