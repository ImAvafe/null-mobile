import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { WebSocketServer } from 'ws';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),

		{
			name: 'websocket-server',
			configureServer() {
				const webSocketServer = new WebSocketServer({ port: 2103 });

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
	]
});
