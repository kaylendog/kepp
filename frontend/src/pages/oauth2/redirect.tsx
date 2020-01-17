import * as React from "react";
import { Redirect as RouterRedirect } from "react-router";
import { SyncLoader } from "react-spinners";

import { AuthWrapperChildProps, withAuthState } from "../../components/AuthorizeState";

class RedirectComponent extends React.Component<AuthWrapperChildProps> {
	render() {
		return (
			(!this.props.authenticated && (
				<div style={{ marginTop: '10rem' }}>
					<SyncLoader color="#c9c"></SyncLoader>{' '}
				</div>
			)) ||
			(this.props.authenticated && <RouterRedirect to="/dashboard" />)
		);
	}

	componentDidMount() {
		this.props.authorize();
	}
}

export const Redirect = withAuthState(RedirectComponent);
