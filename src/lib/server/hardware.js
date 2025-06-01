import { Step } from '../util/step.js';

export const values = {
	tilt: 0,
	throttle: 0,
	break: 0
};

export function setTilt(value) {
	values.tilt = value;
}
export function setThrottle(value) {
	values.throttle = value;
}
export function setBreak(value) {
	values.break = value;
}

new Step(() => {
	console.log(values);
});
