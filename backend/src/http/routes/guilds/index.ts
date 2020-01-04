import { Router } from "express";

import { Route } from "../";
import { Errors } from "../..";
import { GuildModel } from "../../../db/models/Guild";
import { InfractionModel } from "../../../db/models/Infraction";
import { removeFields } from "../../../util/mongo";
import { fetchUser, requireAuthentication } from "../../util/auth";
import { permissionsHandler } from "./permissions";

/**
 * Route for interfacing with user guilds.
 * @param server
 */
export const guilds: Route = {
	path: '/guilds',
	method: 'use',
	handler: (server) =>
		Router()
			.get('/@me', requireAuthentication, async (req, res) => {
				const user = await fetchUser(req, res);
				if (!user) {
					return Errors.Unauthorized(res);
				}

				res.json(user.guilds);
			})
			.get('/:id', requireAuthentication, async (req, res) => {
				const guildID = req.params.id;

				if (!guildID) {
					return Errors.BadRequest(res);
				}

				const user = await fetchUser(req, res);
				if (!user) {
					return;
				}
				if (user.guilds.filter((v) => v.id === guildID).length === 0) {
					return Errors.Unauthorized(res);
				}

				const guild = await GuildModel.findById(guildID);
				return res.json(guild);
			})
			.get('/:id/infractions', requireAuthentication, async (req, res) => {
				if (!req.param('id')) {
					return Errors.BadRequest(res);
				}

				const user = await fetchUser(req, res);
				if (!user) {
					return Errors.ServersideError(res);
				}

				if (
					user.guilds.filter((guild) => guild.id === req.param('id')).length < 1
				) {
					return Errors.Unauthorized(res);
				}

				const infractions = await InfractionModel.find({
					guild_id: req.param('id')
				});

				return res.json(infractions.map((inf) => removeFields(inf)));
			})
			.use(permissionsHandler.handler(server))
};
