import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { WebSocketServer } from 'ws';
import fs from 'fs';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),

		{
			name: 'websocket-server',
			configureServer() {
				const webSocketServer = new WebSocketServer({ port: 2103, host: '0.0.0.0' });

				webSocketServer.on('connection', (ws) => {
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
			}
		}
	],
	server: {
		https: {
			key: fs.readFileSync('../localhost-key.pem'),
			cert: fs.readFileSync('../localhost-cert.pem')
		}
	}
});
