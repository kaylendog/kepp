import { AuthActions, AuthActionTypes } from "./types";

export function authorize(jwt: string): AuthActionTypes {
	return {
		type: AuthActions.Authorize,
		payload: {
			jwt
		}
	};
}
