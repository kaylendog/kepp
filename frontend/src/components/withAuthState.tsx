import * as qs from 'query-string';
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { AppState } from '~/store';
import { AuthActions, AuthActionTypes, AuthStateStatus } from '~/store/auth/types';

import { APIRequestMaker } from '../util/requests';

const connector = connect(
	(state: AppState) => ({ state: state.auth }),
	(dispatch) => ({
		actions: {
			authorize: (jwt: string) =>
				dispatch({
					type: AuthActions.Authorize,
					payload: {
						jwt
					}
				})
		}
	})
);

interface AuthWrapperState {
	authenticated: boolean;
	errored: boolean;
}

export type AuthWrapperChildProps = AuthWrapperState & {
	authorize: () => void;
};

/**
 * Component that wraps the auth state, passing info to children components.
 */
class AuthStateProviderComponent extends React.Component<
	ConnectedProps<typeof connector> &
		RouteComponentProps & {
			children: (state: AuthWrapperChildProps) => any;
		},
	AuthWrapperState
> {
	render() {
		const state = {
			authenticated: this.props.state.status === AuthStateStatus.Authenticated,
			errored: false
		};
		return this.props.children({
			...state,
			authorize: () => this.authorize()
		});
	}

	/**
	 * Try and authenticate with the backend.
	 */
	async authorize() {
		console.log(
			`Logging in - have access code '${
				qs.parse(this.props.location.search).code
			}'...`
		);

		let errored = false;

		try {
			const response = await APIRequestMaker({
				method: 'POST',
				data: {
					state: qs.parse(this.props.location.search).state,
					code: qs.parse(this.props.location.search).code
				},
				url: '/oauth2/authorize'
			});

			this.setState({ authenticated: true });
			this.props.actions.authorize(response.data.token);
		} catch (err) {
			errored = true;
			console.error(err);
		} finally {
			this.setState({
				errored,
				authenticated: this.props.state.status === AuthStateStatus.Authenticated
			});
		}
	}
}

export const AuthStateProvider = withRouter(
	connector(AuthStateProviderComponent)
);

/**
 * Allow a component to access the auth state.
 * @param Component
 */
export const withAuthState = <
	T extends AuthWrapperChildProps = AuthWrapperChildProps
>(
	Component: React.FunctionComponent<T>
): React.FunctionComponent => (props: any) => (
	<AuthStateProvider>
		{(state) => (
			<Component {...state} {...props}>
				{props.children}
			</Component>
		)}
	</AuthStateProvider>
);
