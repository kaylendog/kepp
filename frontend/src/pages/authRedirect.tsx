import * as qs from "query-string";
import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Redirect, RouteComponentProps, StaticContext, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Splash } from "~/layout/default/Splash";
import { AppState } from "~/store";
import { AuthState } from "~/store/auth/types";
import { Button } from "~/theme/Buttons";
import { Heading, SubHeading } from "~/theme/Typography";
import { APIRequestMaker } from "~/util/requests";

const connector = connect((state: AppState) => state.auth, {
	authorize: () => ({ type: 'AUTHORIZE' })
});

class AuthRedirectDispatchComponent extends React.Component<
	ConnectedProps<typeof connector> &
		RouteComponentProps<any, StaticContext, any> & { children: JSX.Element },
	{}
> {
	async tryAuthentication() {
		this.setState({ errored: false, authorized: false });

		console.log(
			`Logging in - have access code '${
				qs.parse(this.props.location.search).code
			}'...`
		);

		try {
			await APIRequestMaker({
				method: 'POST',
				data: {
					state: qs.parse(this.props.location.search).state,
					code: qs.parse(this.props.location.search).code
				},
				url: '/oauth2/authorize'
			});

			this.setState({ authorized: true });
		} catch (err) {
			console.error(err);
			return this.setState({ errored: true });
		}
	}

	componentDidMount() {
		this.tryAuthentication();
	}

	render() {
		const childProps = { authorized: false };
		return <>{this.props.children}</>;
	}
}

const AuthRedirectWrapper = connector(
	withRouter(AuthRedirectDispatchComponent)
);

class AuthRedirectComponent extends React.Component<
	{ errored: boolean; authorized: boolean; tryAuthentication: () => any },
	{}
> {
	render() {
		return (
			<div>
				<Splash>
					{!this.props.errored && (
						<>
							<Heading>Authenticating</Heading>
							<SubHeading>Give us a second...</SubHeading>
						</>
					)}
					{this.props.errored && (
						<>
							<Heading>Authorization Failed.</Heading>
							<SubHeading>
								Something went wrong while we were trying to log you in.
							</SubHeading>
							<Button onClick={() => this.props.tryAuthentication()}>
								Try again?
							</Button>
							<Link to="/">
								<Button>Go home</Button>
							</Link>
						</>
					)}
					{this.props.authorized && <Redirect to="/dashboard" />}
				</Splash>
			</div>
		);
	}
}

export const AuthRedirect = (
	<AuthRedirectDispatchComponent>
		<AuthRedirectComponent></AuthRedirectComponent>
	</AuthRedirectDispatchComponent>
);
