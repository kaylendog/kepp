import * as qs from "query-string";
import * as React from "react";
import { Redirect, RouteComponentProps, StaticContext, withRouter } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { device } from "@theme/.";

import { Button } from "../theme/Buttons";
import { Heading, SubHeading } from "../theme/Typography";
import { APIRequestMaker } from "../util/requests";

const Splash = styled.div`
	margin: 0 auto;
	max-width: 400px;

	@media ${device.tablet} {
		max-width: 600px;
	}

	@media ${device.laptop} {
		max-width: 800px;
	}

	@media ${device.desktop} {
		max-width: 1400px;
	}
`;

class AuthRedirectComponent extends React.Component<
	RouteComponentProps<any, StaticContext, any>,
	{ errored: boolean; authorized: boolean }
> {
	state = {
		errored: false,
		authorized: false
	};

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
		return (
			<div>
				<Splash>
					{!this.state.errored && (
						<>
							<Heading>Authenticating</Heading>
							<SubHeading>Give us a second...</SubHeading>
						</>
					)}
					{this.state.errored && (
						<>
							<Heading>Authorization Failed.</Heading>
							<SubHeading>
								Something went wrong while we were trying to log you in.
							</SubHeading>
							<Button onClick={() => this.tryAuthentication()}>
								Try again?
							</Button>
							<Link to="/">
								<Button>Go home</Button>
							</Link>
						</>
					)}
					{this.state.authorized && <Redirect to="/dashboard" />}
				</Splash>
			</div>
		);
	}
}

export const AuthRedirect = withRouter(AuthRedirectComponent);
