import { Router } from "express";

import { Route } from "../";
import { requireAuthentication } from "../../util/auth";
import { authorizeHandler } from "./authorize";
import { loginHandler } from "./login";
import { logoutHandler } from "./logout";

/**
 * Array of tickets used to validate authentication requests.
 */
export const ACTIVE_AUTH_TICKETS: string[] = [];

export const oauth2: Route = {
	path: "/oauth2",
	method: "use",
	handler: (server) =>
		Router()
			.get("/login", loginHandler(server))
			.post("/authorize", authorizeHandler(server))
			// To-do: Can probably be optimized
			.post("/logout", requireAuthentication, logoutHandler),
};
