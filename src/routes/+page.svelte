<script>
  import Throttle from '$lib/components/Throttle.svelte';
  import { throttleDrag, breakDrag } from '$lib/data/state';
  import Metric from '$lib/components/Metric.svelte';
  import { onMount } from 'svelte';
  import { Socket } from "../lib/client/websocket.js";

  const MAX_TILT = 45;

  let socket = new Socket('wss://192.168.1.227:2103');;
  let wakeLock = null;

  function handleOrientation(event) {
    let tilt = event.beta || 0;

    tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, tilt)) / MAX_TILT;

    if (window.screen.orientation.angle === 270) {
      tilt = -tilt;
    }
    

    socket.send(JSON.stringify({
      type: 'tilt',
      value: tilt
    }));
  }

  async function requestWakeLock() {
    try {
      wakeLock = await navigator.wakeLock.request('screen');

      wakeLock.addEventListener('release', () => {
        console.log('Wake Lock was released');
      });

      console.log('Wake Lock is active');
    } catch (error) {
      console.error(error);
    }
  }

  onMount(() => {
    window.addEventListener('deviceorientation', handleOrientation, true);

    if ('wakeLock' in navigator) {
      requestWakeLock();
    }

    socket.open();
  });
</script>
  <div class="flex flex-row min-h-screen h-screen [&>*]:flex-1">
  <Throttle onDrag={(value) => {
    throttleDrag.set(value);

    socket.send(JSON.stringify({
      type: 'throttle',
      value: value
    }));
  }} />
  <div>
    <div class="w-full h-full flex flex-col items-center justify-center">
      <div class="flex flex-col gap-12">
        <Metric label="Throttle" value={`${Math.round($throttleDrag * 100)}%`} />
      </div>
      <p class="text-stone-500 font-bold font-mono bottom-6 fixed">NULL-MOBILE</p>
    </div>
  </div>
  <Throttle onDrag={(value) => {
    throttleDrag.set(value);

    socket.send(JSON.stringify({
      type: 'throttle',
      value: value
    }));
  }} />
</div>