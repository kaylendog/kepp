import { applyMiddleware, combineReducers, compose, createStore, StoreEnhancer } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";

import { authReducer } from "./auth/reducers";

const rootReducer = combineReducers({
	auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

const composedEnhancers = compose(devToolsEnhancer({})) as StoreEnhancer<
	unknown,
	{}
>;

export const store = createStore(rootReducer, {}, composedEnhancers);
