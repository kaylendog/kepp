import { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../redux/store";
import { ThemeProvider } from "../theme/theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
	<Provider store={store}>
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	</Provider>
);

export default App;
