import * as React from 'react';
import { RouteConfig } from 'react-router-config';

import { AuthWrapperChildProps, withAuthState } from '../components/withAuthState';
import { NotFound } from './404';
import { Dashboard } from './dashboard';
import { Landing } from './landing';
import { Redirect } from './oauth2/redirect';

const requireAuth = withAuthState<AuthWrapperChildProps & { children: any }>(
	(state) => (props: any) =>
		state.authenticated ? state.children(props) : <Redirect to="/"></Redirect>
);

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
