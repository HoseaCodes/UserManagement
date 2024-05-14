import React, { useState, useContext, useEffect } from 'react';

import { Link } from "react-router-dom";
import { GlobalContext } from '../../context/globalState';

import "./login.css";

const initialState = {
	"email": "",
	"password": "",
}

const Login = () => {
	const { loginSubmit } = useContext(GlobalContext);
	const [currentUser, setCurrentUser] = useState(initialState);

	const handleSubmit = (e) => {
		e.preventDefault();
		loginSubmit(currentUser);
	}

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setCurrentUser({ ...currentUser, [name]: value });
	};

	return (
		<main>

		<div id="login-page-container">
			<div className="login-page">
				<form onSubmit={(e) => handleSubmit(e)}>
					<h2 className="login-title">Sign in to your account</h2>
					<p></p>
					<label htmlFor="e-mail">E-mail</label>
					<input
						type="email"
						name="email"
						id="e-mail"
						required
						placeholder="Your e-mail address"
						value={currentUser.email}
						onChange={onChangeInput}
						/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						required
						autoComplete="on"
						placeholder="Enter your password"
						value={currentUser.password}
						onChange={onChangeInput}
						/>

					<div className="row">
						<button type="submit">Login</button>
						<div>
							Not yet signed up? <Link to="/register">Sign up here!</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
		</main>
	);
};

export default Login;
