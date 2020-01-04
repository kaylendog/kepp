import { RouteConfig } from "react-router-config";

import { Landing } from "./Landing";

export const routes: RouteConfig[] = [
	{
		component: Landing,
		path: "/",
		exact: true
	}
];
