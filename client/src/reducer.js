export default (state = {}, action) => {
	const payload = action.payload;
	console.log(action);
	switch (action.type) {
		case 'SOCKET': {
			return { ...state, connection: payload };
		}
		case 'TOGGLE_BUTTON': {
			return { ...state, comming: payload };
		}
		default: {
			return { ...state, payload };
		}
	}
};
