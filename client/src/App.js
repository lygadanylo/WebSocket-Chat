import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createConnection, toggleButton } from './action';
import Account from './components/account';
import ListUser from './components/userList';
import ChatWindow from './components/chatWindow';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { nameField: ' ' };
	}
	render() {
		const { createConnection, comming, toggleButton, connection, newUsers } = this.props;
		const { nameField } = this.state;
		return (
			<div className="container-wrapper">
				{connection ? (
					<div className="body-wrapper">
						<div className="left-column col-sm-6 col-md-6 col-lg-6 ol-xl-6">
							<Account userName={connection.user} />
							<ListUser users={newUsers} />
						</div>
						<ChatWindow />
					</div>
				) : (
					<div>
						{comming ? (
							<div className="form">
								<p>Write your name:</p>
								<input
									onChange={(e) => {
										this.setState({ nameField: e.target.value });
									}}
								/>
								<button onClick={() => createConnection(nameField)}>Submit</button>
							</div>
						) : (
							<button onClick={() => toggleButton(true)}>Connect to chat</button>
						)}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { connection, comming, newUsers } = state;
	return { connection, comming, newUsers };
};

const mapDispatchToProps = { createConnection, toggleButton };

export default connect(mapStateToProps, mapDispatchToProps)(App);
