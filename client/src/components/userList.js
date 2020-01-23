import React from 'react';

const ListUser = (props) => {
	const { users } = props;
	return (
		<div className="userList-wrapper">
			<h1>ONLINE</h1>
			<div className="user-list">
				<ul>
					{users &&
						users.map((elem, index) => {
							return <li key={index}>{elem}</li>;
						})}
				</ul>
			</div>
		</div>
	);
};

export default ListUser;
