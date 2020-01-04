import * as express from "express";
import * as qs from "query-string";

import { FoxServer } from "../..";
import { OAuth2Config, OAuth2ConfigSchema } from "../../../config/oauth2";
import { validateObject } from "../../../config/validation";
import { ServersideError } from "../../errors";
import { ACTIVE_AUTH_TICKETS } from "./";

export const loginHandler = (server: FoxServer) => (
	req: express.Request,
	res: express.Response
) => {
	server.logger.debug('[oauth2] Checking OAuth2 config is valid...');

	if (!validateObject(OAuth2ConfigSchema, OAuth2Config).valid) {
		server.logger.warn(
			'[oauth2] OAuth is currently unconfigured, or is configured incorrectly. Please configure it in "config.json".'
		);
		return ServersideError(res, 'OAuth2 unconfigured.');
	}

	server.logger.debug('[oauth2] Config valid. Creating auth ticket...');

	const state = Math.floor(Math.random() * 1e16).toString(16);
	ACTIVE_AUTH_TICKETS.push(state);

	server.logger.debug(`[oauth2][login] Created auth ticket "${state}"`);

	res.redirect(
		`https://discordapp.com/api/oauth2/authorize?${qs.stringify({
			...OAuth2Config,
			response_type: 'code',
			state
		})}`
	);

	server.logger.debug(
		`[oauth2][login][${state}] Redirected to Discord. Awaiting for redirect request...`
	);

	// Ensure tickets expire after 15 minutes.
	setTimeout(() => {
		const index = ACTIVE_AUTH_TICKETS.indexOf(state);
		if (index !== -1) {
			ACTIVE_AUTH_TICKETS.splice(index, 1);
		}
	}, 9e5);
};
