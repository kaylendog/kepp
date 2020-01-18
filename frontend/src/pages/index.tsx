import * as React from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect as RedirectDOM } from 'react-router-dom';

import { withAuthState } from '../components/withAuthState';
import { NotFound } from './404';
import { Dashboard } from './dashboard';
import { Landing } from './landing';
import { Redirect } from './oauth2/redirect';

/**
 * Make a route require authentication
 * @param Component
 */
const requireAuth = (Component: React.FunctionComponent) =>
	withAuthState((state) => {
		return state.authenticated ? (
			<Component />
		) : (
			<RedirectDOM to="/"></RedirectDOM>
		);
	});

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
		component: requireAuth(Dashboard),
		path: '/dashboard'
	},
	{
		component: NotFound,
		path: '*'
	}
];
