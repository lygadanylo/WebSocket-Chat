import React from 'react';
import avatar from '../img/avatar.png';

const Account = (props) => {
	const { userName } = props;
	return (
		<div className="account-info-wrapper">
			<div className="avatar">
				<div className="img-wrapper">
					<img src={avatar} alt="avatar" />
				</div>
				<div className="info-wrapper">
					<div className="name-wrapper">
						<h1>Name:</h1>
						<p>{userName}</p>
					</div>
					<div className="status-wrapper">
						<h1>Status:</h1>
						<p id="indicator" />
						<p>ONLINE</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
