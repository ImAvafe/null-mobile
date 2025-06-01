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
		host: true, // listen on all interfaces (0.0.0.0)
		port: 5173, // main dev server port
		cors: true, // allow all origins
		origin: '*',
		strictPort: false, // fallback port if 3000 taken

		// HMR config to support tunnels like Ngrok:
		hmr: {
			// If you want Vite’s built-in HMR websockets to connect on 2103 instead of default:
			port: 2103, // force HMR websocket on port 2103
			clientPort: 2103, // client connects to this port for HMR websocket
			protocol: 'ws' // websocket protocol (ws or wss)
		},

		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*'
		},

		allowedHosts: 'all'
	}
});
