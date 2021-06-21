import DefaultLayout from "kepp-frontend/layout/Default";
import { toggleTheme } from "kepp-frontend/redux/features/theme";
import { useAppDispatch } from "kepp-frontend/redux/hooks";
import React from "react";

export default function Home() {
	const dispatch = useAppDispatch();

	return (
		<DefaultLayout>
			<h1>foxes</h1>
			<button onClick={() => dispatch(toggleTheme())}>toggle the theme!</button>
		</DefaultLayout>
	);
}
