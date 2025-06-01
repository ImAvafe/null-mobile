export class Step {
	private callback: () => void;
	private running: boolean = false;

	constructor(callback: () => void) {
		this.callback = callback;
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
