import https from 'https';
import fs from 'fs';
import { WebSocketServer } from 'ws';
import { setTilt, setBreak, setThrottle } from './hardware';

const server = https.createServer({
	key: fs.readFileSync('../localhost-key.pem'),
	cert: fs.readFileSync('../localhost-cert.pem')
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
	console.log('New WebSocket connection established');
	ws.on('message', (rawData) => {
		try {
			const message = JSON.parse(rawData.toString());
			
			if (message !== null) {
				if (message.type === "tilt") {
					setTilt(message.value);
				} else if (message.type === "break") {
					setBreak(message.value);
				} else if (message.type === "throttle") {
					setThrottle(message.value);
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
	console.log('Secure WebSocket server running on wss://192.168.1.227:2103');
});
