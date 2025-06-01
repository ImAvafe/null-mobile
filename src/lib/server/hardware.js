import https from 'https';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const motor_values = {
	tilt: 0,
	throttle: 0,
	break: 0
};

const server = https.createServer({
	key: fs.readFileSync('../localhost-key.pem'),
	cert: fs.readFileSync('../localhost-cert.pem')
});

const wss = new WebSocketServer({ server });

function loop() {
	console.log(motor_values);

	setTimeout(loop, 16);
}

loop();

wss.on('connection', (ws) => {
	console.log('New WebSocket connection established');
	ws.on('message', (rawData) => {
		try {
			const message = JSON.parse(rawData.toString());
			
			if (message !== null) {
				if (message.type === "tilt") {
					motor_values.tilt = message.value;
				} else if (message.type === "break") {
					motor_values.break = message.value;
				} else if (message.type === "throttle") {
					motor_values.throttle = message.value;
				}
			}
		} catch (error) {
			console.error(`Error processing message: ${error}`);
		}
	});
	ws.on('close', () => {
		console.log('WebSocket connection closed');
	});
	ws.on('error', (error) => {
		console.error(`WebSocket error: ${error}`);
	});
});

server.listen(2103, '0.0.0.0', () => {
	console.log('WebSocket server running! 2103');
});
