import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createConnection, toggleButton } from './action';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { nameField: ' ' };
	}
	render() {
		const { createConnection, comming, toggleButton } = this.props;
		const { nameField } = this.state;
		console.log(nameField);
		return (
			<Fragment>
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
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	const { connection, comming } = state;
	return { connection, comming };
};

const mapDispatchToProps = { createConnection, toggleButton };

export default connect(mapStateToProps, mapDispatchToProps)(App);
