import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers";

export const configureAppStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		preloadedState: { auth: { loggedIn: false, token: undefined } },
		middleware: [...getDefaultMiddleware()],
	});

	if (process.env.NODE_ENV !== "production" && module.hot) {
		module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
	}

	return store;
};

export const store = configureAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
