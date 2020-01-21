import express from 'express';
import os from 'os';
import http from 'http';
import uuid from 'uuid';
import cors from 'cors';
import webSocket from 'ws';

const HOST = os.networkInterfaces().Ethernet[1].address;
const PORT = 80;
const WEB_PORT = 81;

const app = express();
app.use(cors());

app.get('/socket', (req, res) => {
	const SID = uuid.v4();
	return res.status(200).json({ SID });
});

app.listen(PORT, HOST, () => {
	console.log(`Server listen on port - ${PORT} and host - ${HOST}`);
});

const server = http.createServer((requset, response) => {});

server.listen(WEB_PORT, () => {
	console.log(`Socket server working on PORT - ${WEB_PORT}`);
});

const wsServer = new webSocket.Server({ server });

wsServer.on('connection', (ws) => {
	console.log('connection created');
	ws.on('message', (message) => {
		console.log(message);
	});
	ws.on('close', () => {
		console.log('connection closed');
	});
});
