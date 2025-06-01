import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { WebSocketServer } from 'ws';
import fs from 'fs';
import https from 'https';

const httpsOptions = https.createServer({
	key: fs.readFileSync('../localhost-key.pem'),
	cert: fs.readFileSync('../localhost-cert.pem')
});

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		https: httpsOptions
	}
});
