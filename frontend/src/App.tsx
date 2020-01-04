import "./scss/main.scss";

import * as React from "react";
import { hot } from "react-hot-loader/root";
import { renderRoutes } from "react-router-config";
import { BrowserRouter, Switch, withRouter } from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, theme } from "@theme/.";

import { DefaultLayout } from "./layout/default";
import { routes } from "./pages";

const TransitionWrapper = withRouter((props: any) => (
	<TransitionGroup>
		<Transition key={props.location.pathname} timeout={{ enter: 0, exit: 0 }}>
			<Switch location={props.location}>{props.children}</Switch>
		</Transition>
	</TransitionGroup>
));

const App = () => (
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<DefaultLayout>{renderRoutes(routes)}</DefaultLayout>
		</ThemeProvider>
	</BrowserRouter>
);

export const AppHMR = hot(App);
