import { categoryLog } from "kepp-frontend/util/log";

import { createAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export enum Theme {
	Light,
	Dark,
}

type ThemeState = Theme;
const initialState = Theme.Light as ThemeState;

// actions
export const setTheme = createAction<Theme>("SET_THEME");
export const toggleTheme = createAction("TOGGLE_THEME");

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(setTheme, (state, action) => {
				categoryLog("theme", `Switching to theme ${action.payload}`);
				state = action.payload;
			})
			.addCase(toggleTheme, (state) => {
				categoryLog("theme", "Toggling themes...");
				return (state = state == Theme.Dark ? Theme.Light : Theme.Dark);
			});
	},
});

export const selectTheme = (state: RootState) => state.theme;
export default themeSlice.reducer;
