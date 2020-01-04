import "./scss/main.scss";

import * as React from "react";
import { hot } from "react-hot-loader/root";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { routes } from "@pages/.";
import { GlobalStyle, theme } from "@theme/.";

import { DefaultLayout } from "./layout/default";

const App = () => (
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<DefaultLayout>{renderRoutes(routes)}</DefaultLayout>
		</ThemeProvider>
	</BrowserRouter>
);

export const AppHMR = hot(App);
