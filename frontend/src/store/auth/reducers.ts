import { AuthActions, AuthActionTypes, AuthState } from "./types";

const initialState: AuthState = {
	jwt: 'null',
	state: 'UNAUTHORIZED'
};

export const authReducer = (
	state = initialState,
	action: AuthActionTypes
): AuthState => {
	switch (action.type) {
		case AuthActions.Authorize:
			return {
				...state,
				jwt: action.payload.jwt
			};

		default: {
			return state;
		}
	}
};
