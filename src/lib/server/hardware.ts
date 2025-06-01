import { Step } from '$lib/util/step';

export const values = {
	tilt: 0,
	throttle: 0,
	break: 0
};

export function setTilt(value: number) {
	values.tilt = value;
}
export function setThrottle(value: number) {
	values.throttle = value;
}
export function setBreak(value: number) {
	values.break = value;
}

new Step(() => {
	console.log(values);
});
