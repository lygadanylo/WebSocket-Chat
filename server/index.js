import express from 'express';
import os from 'os';
import http from 'http';
import uuid from 'uuid';
import cors from 'cors';
import Filter from './filter';
import WebSocketServer from 'websocket';
import EventEmitter from 'events';

const HOST = os.networkInterfaces().Ethernet[1].address;
const PORT = 80;
const WEB_PORT = 81;

const app = express();
let SESSION = new Map();
const emitter = new EventEmitter();
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

const wsServer = new WebSocketServer.server({
	httpServer: server
});

wsServer.on('request', (request) => {
	let connection = request.accept(null, request.origin);

	connection.on('message', (message) => {
		if (message.type === 'utf8') {
			Filter(connection, SESSION, message.utf8Data, emitter);
		}
	});
});

emitter.on('connectionUser', () => {
	SESSION.forEach((val, key) => {
		val.send(JSON.stringify({ msg: 'connectionUsers', userName: val.userName }));
	});
});
