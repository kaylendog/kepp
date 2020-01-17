export enum AuthStateStatus {
	Authenticated = 'AUTHENTICATED',
	Authorizing = 'AUTHORIZING',
	Unauthorized = 'UNAUTHORIZED'
}

export interface AuthState {
	jwt: string | null;
	status: AuthStateStatus;
}

export enum AuthActions {
	Authorize = 'AUTHORIZE',
	Logout = 'LOGOUT'
}

interface AuthorizeAction {
	type: AuthActions.Authorize;
	payload: {
		jwt: string;
	};
}

export type AuthActionTypes = AuthorizeAction;
