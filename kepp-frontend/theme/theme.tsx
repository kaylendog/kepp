import Head from "next/head";
import { useSelector } from "react-redux";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { selectTheme, Theme } from "../redux/features/theme";
import { DARK_THEME } from "./dark";
import { GlobalStyles } from "./globalStyles";
import { LIGHT_THEME } from "./light";

export const ThemeProvider: React.FC = ({ children }) => {
	const state = useSelector(selectTheme);
	const theme = state == Theme.Light ? LIGHT_THEME : DARK_THEME;
	// return theme provider
	return (
		<StyledThemeProvider theme={theme}>
			<Head>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins&family=Source+Sans+Pro&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<GlobalStyles />
			{children}
		</StyledThemeProvider>
	);
};
