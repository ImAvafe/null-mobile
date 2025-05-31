<script lang="ts">
  import { draggable } from '@neodrag/svelte';
  import { Tween } from 'svelte/motion';
  import { expoOut } from 'svelte/easing';

  export let onDrag = (value: number) => {};

  let drag_position = new Tween({ x: 0, y: 0 }, { easing: expoOut, duration: 1200 });
</script>

<div use:draggable={{
  onDragEnd: () => {
    drag_position.target = { x: 0, y: 0 };

    onDrag(0);
  },
  onDrag: ({ offsetX, offsetY }) => {
    drag_position.set({ x: offsetX, y: offsetY }, { duration: 0 });

    onDrag(Math.max(-1, Math.min(1, ((offsetY / window.innerHeight) / -1) * 2)));
  },
  position: drag_position.current,
  axis: 'y',
  ignoreMultitouch: false,
}}></div>

<style>
  div {
    background-image: url("$lib/img/grid.svg");
    background-size: 100%;
    background-position: center;
  }
</style>