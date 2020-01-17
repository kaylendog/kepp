import { AuthActions, AuthActionTypes, AuthState, AuthStateStatus } from "./types";

const initialState: AuthState = {
	jwt: 'null',
	status: AuthStateStatus.Unauthorized
};

export const authReducer = (
	state = initialState,
	action: AuthActionTypes
): AuthState => {
	switch (action.type) {
		case AuthActions.Authorize:
			return {
				...state,
				jwt: action.payload.jwt,
				status: AuthStateStatus.Authenticated
			};

		default: {
			return state;
		}
	}
};
