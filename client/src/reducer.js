export default (state = {}, action) => {
	const payload = action.payload;
	console.log(action);
	switch (action.type) {
		case 'SOCKET_CONNECTION': {
			return { ...state, connection: payload };
		}
		case 'TOGGLE_BUTTON': {
			return { ...state, comming: payload };
		}
		case 'NEW_USER_CONNECT': {
			return { ...state, newUser: payload };
		}
		default: {
			return { ...state, payload };
		}
	}
};
