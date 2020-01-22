import axios from 'axios';

let ws;
let userArray = [];
export const newUserConnect = (data) => ({
	type: 'NEW_USER_CONNECT',
	payload: data
});

export const SocketConnect = (data) => ({
	type: 'SOCKET_CONNECTION',
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
			const { SID } = response.data;
			ws.onopen = () => {
				console.log('connection is opened');

				ws.send(JSON.stringify({ user: { name: data, user_id: SID }, msg: 'Connection' }));
			};
			ws.onmessage = (message) => {
				const parsedData = JSON.parse(message.data);
				switch (parsedData.msg) {
					case 'UserCreateConnected': {
						dispatch(SocketConnect(parsedData));
						break;
					}
					case 'connectionUsers': {
						userArray.push(parsedData.userName);
						dispatch(newUserConnect(userArray));
					}
					default: {
						return null;
					}
				}
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
