import * as React from "react";
import { RouteConfig } from "react-router-config";

import { NotFound } from "./404";
import { AuthRedirect } from "./authRedirect";
import { Landing } from "./Landing";

export const routes: RouteConfig[] = [
	{
		component: () => <Landing />,
		path: '/',
		exact: true
	},
	{
		component: () => <AuthRedirect />,
		path: '/auth/redirect',
		exact: true
	},
	{
		component: () => <NotFound />,
		path: '*'
	}
];
