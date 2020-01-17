import * as qs from "query-string";
import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { AppState } from "~/store";
import { AuthActions, AuthActionTypes, AuthStateStatus } from "~/store/auth/types";

import { APIRequestMaker } from "../util/requests";

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
class AuthWrapperComponent extends React.Component<
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

const AuthWrapper = withRouter(connector(AuthWrapperComponent));

type ComponentConstructor = new (props: any) => React.Component<
	AuthWrapperChildProps & any,
	any
>;
type ComponentFunction = (props: any) => JSX.Element;

/**
 *
 * @param component
 */
export const withAuthState = (
	Component: ComponentConstructor | ComponentFunction
) => (props: any) => (
	<AuthWrapper>{(state) => <Component {...state} {...props} />}</AuthWrapper>
);
