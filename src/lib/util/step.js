export class Step {
	constructor(callback) {
		this.callback = callback;
		this.running = false;
	}

	start() {
		this.running = true;
		const loop = () => {
			if (!this.running) return;
			this.callback();
			requestAnimationFrame(loop);
		};
		requestAnimationFrame(loop);
	}

	stop() {
		this.running = false;
	}
}
