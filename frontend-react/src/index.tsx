import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { store } from "./redux";
import { routes } from "./routes";

const GlobalStyle = createGlobalStyle`
html {
    font-family: 'Source Sans Pro', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
}
`;

// create hot app
const App = hot(() => (
	<BrowserRouter>
		<GlobalStyle />
		<Provider store={store}>{renderRoutes(routes)}</Provider>
	</BrowserRouter>
));

ReactDOM.render(<App />, document.querySelector("#mount"));
