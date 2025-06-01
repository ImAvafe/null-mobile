import https from 'https';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const server = https.createServer({
	key: fs.readFileSync('../localhost-key.pem'),
	cert: fs.readFileSync('../localhost-cert.pem')
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
	console.log('New WebSocket connection established');
	ws.on('message', (message) => {
		console.log(`Received message: ${message}`);
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
