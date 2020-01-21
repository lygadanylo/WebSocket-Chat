import axios from 'axios';

let ws;

export const SocketConnect = (data) => ({
	type: 'SOCKET',
	payload: data
});

export const toggleButton = (data) => ({
	type: 'TOGGLE_BUTTON',
	payload: data
});

export const createConnection = (data) => (dispatch) => {
	axios({
		method: 'GET',
		url: 'http://172.24.211.94/socket'
	})
		.then((response) => {
			ws = new WebSocket('ws://172.24.211.94:81');
			console.log(ws);
			ws.onopen = () => {
				console.log('connection is opened');
				dispatch(SocketConnect(response.data.SID));
				ws.send(JSON.stringify({ user: data, user_id: response.data.SID }));
			};
			ws.onmessage = (message) => {
				console.log(message.data);
			};
			ws.onerror = (error) => {
				console.log(error);
			};
			ws.onclose = () => {
				console.log('connection closed');
			};
		})
		.catch((error) => {
			console.log(error);
		});
};
