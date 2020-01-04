import Axios, { AxiosResponse } from "axios";
import * as Discord from "discord.js";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as qs from "query-string";

import { FoxServer } from "../..";
import { OAuth2Config, OAuth2ConfigSchema } from "../../../config/oauth2";
import { validateObject } from "../../../config/validation";
import { ClientUserModel } from "../../../db/models/ClientUser";
import { UserModel } from "../../../db/models/User";
import { fetchCurrentUser, fetchCurrentUserGuilds } from "../../../util/requests";
import { BadRequest, ServersideError } from "../../errors";
import { ACTIVE_AUTH_TICKETS } from "./";

export const authorizeHandler = (server: FoxServer) => async (
	req: express.Request,
	res: express.Response,
) => {
	await Promise.resolve();

	if (!validateObject(OAuth2ConfigSchema, OAuth2Config).valid) {
		server.logger.warn(
			'[oauth2] OAuth is currently unconfigured, or is configured incorrectly. Please configure it in ".env".',
		);
		return ServersideError(res, "OAuth2 unconfigured.");
	}

	server.logger.debug(
		`[oauth2][authorize] Attempting to auth '${JSON.stringify(req.body)}'`,
	);

	if (ACTIVE_AUTH_TICKETS.indexOf(req.body.state) === -1) {
		server.logger.debug(
			`[oauth2][authorize][${req.body.state}] Invalid ticket for authorization request - denying...`,
		);
		return BadRequest(
			res,
			"Invalid authorization ticket. Please try again.",
		);
	}

	ACTIVE_AUTH_TICKETS.splice(ACTIVE_AUTH_TICKETS.indexOf(req.body.state), 1);

	if (!req.body.code) {
		return BadRequest(res, "No authorization code provided.");
	}

	server.logger.debug(
		`[oauth2][authorize][${req.body.state}] Exchanging code "${req.body.code}" with Discord...`,
	);

	let response: AxiosResponse<any> | undefined;

	// Obtain access token from discord
	try {
		response = await Axios.post(
			"https://discordapp.com/api/oauth2/token",
			qs.stringify({
				...OAuth2Config,
				code: req.body.code,
				grant_type: "authorization_code",
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);
	} catch (err) {
		console.error(err);
		return ServersideError(res);
	}
	if (!response || !response.data.access_token) {
		return BadRequest(res, "Invalid response from Discord.");
	}

	/**
	 * Object for temporarily holding OAuth data
	 */
	const tokenData = {
		access_token: response.data.access_token,
		expires_in: response.data.expires_in,
		refresh_token: response.data.refresh_token,
	};

	server.logger.debug(
		`[oauth2][authorize][${req.body.state}] Token received. Updating database...`,
	);

	server.logger.debug(
		`[oauth2][authorize][${req.body.state}] Requesting user object from Discord...`,
	);

	// Fetch user data
	const user = await fetchCurrentUser<{
		id: string;
		username: string;
		discriminator: string;
		avatar: string;
	}>(tokenData.access_token);

	server.logger.debug(
		`[oauth2][authorize][${req.body.state}] Saving to database...`,
	);

	// Send the end-user their access token

	const token = jwt.sign(
		{
			access_token: response.data.access_token,
		},
		OAuth2Config.client_secret,
	);

	// Update client user document
	await ClientUserModel.updateOne(
		{ _id: user.id },
		{
			_id: user.id,

			access_token: tokenData.access_token,
			refresh_token: tokenData.refresh_token,

			expires_at: Date.now() + tokenData.expires_in,

			token,
		},
		{ upsert: true },
	);

	res.json({
		token,
	});

	server.logger.debug(
		`[oauth2][authorize][${req.body.state}] Done. Fetching user guilds...`,
	);

	const userGuilds = await fetchCurrentUserGuilds<
		{
			permissions: number;
		}[]
	>(tokenData.access_token);

	const guilds = userGuilds.filter((guild: { permissions: number }) =>
		new Discord.Permissions(guild.permissions).has("MANAGE_GUILD", true),
	);

	// Update user document
	await UserModel.updateOne(
		{ _id: user.id },
		{
			_id: user.id,

			avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
			tag: `${user.username}#${user.discriminator}`,

			guilds,
		},
		{
			upsert: true,
		},
	);

	server.logger.debug(
		`[oauth2][authorize][${req.body.state}] Updated user in database.`,
	);
	server.logger.debug(
		`[oauth2][authorize][${req.body.state}] Login flow complete.`,
	);

	server.logger.info(
		`[oauth][authorize] User ID '${user.id}' authenticated.`,
	);
};
