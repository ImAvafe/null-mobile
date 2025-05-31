import { writable } from 'svelte/store';

export const throttleDrag = writable(0);
export const breakDrag = writable(0);
