<script lang="ts">
  import Throttle from '$lib/components/Throttle.svelte';
  import { throttleDrag, breakDrag } from '$lib/data/state.ts';
  import Metric from '$lib/components/Metric.svelte';
  import { onMount } from 'svelte';

  let socket: WebSocket | null = null;

  onMount(() => {
    socket = new WebSocket("ws://192.168.1.86:2103");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };
    socket.onerror = (event) => {
      console.error("WebSocket error:", event);
    };
    socket.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };
  });

  function handleOrientation(event: DeviceOrientationEvent) {
    socket?.send(JSON.stringify({
      type: 'tilt',
      value: event.alpha
    }));
  }

  function requestOrientationAccess() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().then((permissionState) => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          alert('Permission not granted');
        }
      }).catch(console.error);
    } else {
      // Android and older iOS
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  }
</script>

  <div class="flex flex-row min-h-screen h-screen [&>*]:flex-1">
  <Throttle onDrag={(value) => {
    breakDrag.set(value);
    
    socket?.send(JSON.stringify({
      type: 'break',
      value: value
    }));
  }} />
  <div>
    <div class="w-full h-full flex flex-col items-center justify-center">
      <div class="flex flex-col gap-12">
        <Metric label="Throttle" value={`${Math.round($throttleDrag * 100)}%`} />
        <Metric label="Break" value={`${Math.round($breakDrag * 100)}%`} />
        <button on:click={requestOrientationAccess} class="bg-white">Orientation Perm</button>
      </div>
      <p class="text-stone-500 font-bold font-mono bottom-6 fixed">NULL-MOBILE</p>
    </div>
  </div>
  <Throttle onDrag={(value) => {
    throttleDrag.set(value);

    socket?.send(JSON.stringify({
      type: 'throttle',
      value: value
    }));
  }} />
</div>