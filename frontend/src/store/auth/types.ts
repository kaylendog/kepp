export interface AuthState {
	jwt: string | null;
	state: 'AUTHORIZED' | 'AUTHORIZING' | 'UNAUTHORIZED';
}

export enum AuthActions {
	Authorize = 'AUTHORIZE'
}

interface AuthorizeAction {
	type: AuthActions.Authorize;
	payload: {
		jwt: string;
	};
}

export type AuthActionTypes = AuthorizeAction;
