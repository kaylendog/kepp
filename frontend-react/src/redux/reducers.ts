import { combineReducers } from "redux";

import auth from "./slices/auth";

export const rootReducer = combineReducers({ auth });
