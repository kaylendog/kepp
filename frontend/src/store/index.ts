import { applyMiddleware, combineReducers, compose, createStore, StoreEnhancer } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import { authReducer } from "./auth/reducers";

const rootReducer = combineReducers({
	auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = compose(
	middlewareEnhancer,
	devToolsEnhancer({})
) as StoreEnhancer<unknown, {}>;

export const store = createStore(rootReducer, {}, composedEnhancers);
