import React from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login, logout } from "../redux/slices/auth";

export const Home: React.FC = () => {
	const auth = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	return (
		<>
			<h1>hello world!</h1>
			{auth.loggedIn ? (
				<button onClick={() => dispatch(logout())}>Logout</button>
			) : (
				<button onClick={() => dispatch(login("sometoken1234"))}>Login</button>
			)}
			{auth.loggedIn && <span>You you are logged in using token: {auth.token}</span>}
		</>
	);
};
