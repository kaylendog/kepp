import * as React from "react";
import { RouteConfig } from "react-router-config";

import { NotFound } from "./404";
import { Landing } from "./landing";
import { Redirect } from "./oauth2/redirect";

export const routes: RouteConfig[] = [
	{
		component: Landing,
		path: '/',
		exact: true
	},
	{
		component: Redirect,
		path: '/auth/redirect',
		exact: true
	},
	{
		component: NotFound,
		path: '*'
	}
];
