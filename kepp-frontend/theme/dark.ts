import _ from "lodash";

import { LIGHT_THEME } from "./light";
import { Theme } from "./types";

export const DARK_THEME: Theme = _.merge({}, LIGHT_THEME, {
	background: "#161616",
	colors: {
		primary: "#fff",
		secondary: "#bbb",
		highlight: "#fcf",
	},
});
