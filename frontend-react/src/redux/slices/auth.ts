import { createAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
	loggedIn: boolean;
	token: string | undefined;
}

export const login = createAction<string>("login");
export const logout = createAction("logout");

const initialState: AuthState = { loggedIn: false, token: undefined };

const loginSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(login, (state, action) => {
				state.loggedIn = true;
				state.token = action.payload;
			})
			.addCase(logout, (state) => {
				state.loggedIn = false;
				state.token = undefined;
			}),
});

export default loginSlice.reducer;
