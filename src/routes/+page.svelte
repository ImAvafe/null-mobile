<script>
  import Throttle from '$lib/components/Throttle.svelte';
  import { throttleDrag, breakDrag } from '$lib/data/state.ts';
  import Metric from '$lib/components/Metric.svelte';
  import { Step } from '$lib/util/step';
	import { onMount } from 'svelte';

  breakDrag.subscribe((value) => {
    console.log(`break: ${value}`);
  });
  throttleDrag.subscribe((value) => {
    console.log(`throttle: ${value}`);
  });

  // onMount(() => {
  //   new Step(() => {
  //     console.log('step');
  //   }).start();
  // });
</script>

<div class="flex flex-row min-h-screen h-screen [&>*]:flex-1">
  <Throttle onDrag={(value) => {
    breakDrag.set(value)
  }} />
  <div>
    <div class="w-full h-full flex flex-col items-center justify-center">
      <div class="flex flex-col gap-12">
        <Metric label="Throttle" value={`${Math.round($throttleDrag * 100)}%`} />
        <Metric label="Break" value={`${Math.round($breakDrag * 100)}%`} />
      </div>
      <p class="text-stone-500 font-bold font-mono bottom-6 fixed">NULL-MOBILE</p>
    </div>
  </div>
  <Throttle onDrag={(value) => {
    throttleDrag.set(value)
  }} />
</div>