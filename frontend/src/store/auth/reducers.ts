import { AuthActions, AuthActionTypes, AuthState, AuthStateStatus } from './types';

const initialState: AuthState = {
	jwt: localStorage.getItem('token') || 'null',
	status: localStorage.getItem('token')
		? AuthStateStatus.Authenticated
		: AuthStateStatus.Unauthorized
};

export const authReducer = (
	state = initialState,
	action: AuthActionTypes
): AuthState => {
	switch (action.type) {
		case AuthActions.Authorize: {
			localStorage.setItem('token', action.payload.jwt);
			return {
				...state,
				jwt: action.payload.jwt,
				status: AuthStateStatus.Authenticated
			};
		}

		default: {
			return state;
		}
	}
};
