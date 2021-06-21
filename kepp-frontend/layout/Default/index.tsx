import React from "react";

import { Header } from "./Header";

const DefaultLayout: React.FC = ({ children }) => {
	return (
		<main>
			<Header />
			<section>{children}</section>
		</main>
	);
};

export default DefaultLayout;
