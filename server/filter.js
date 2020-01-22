export default (connection, SESSION, message, emitter) => {
	const parseData = JSON.parse(message);
	switch (parseData.msg) {
		case 'Connection': {
			connection.userId = parseData.user.user_id;
			connection.userName = parseData.user.name;
			SESSION.set(connection.userId, connection);
			const { name } = parseData.user;
			connection.send(JSON.stringify({ msg: 'UserCreateConnected', status: true, user: name }));
			emitter.emit('connectionUser');
		}
		default: {
			return null;
		}
	}
};
