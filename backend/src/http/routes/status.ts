import { Router } from "express";

import { ClientUserModel } from "../../db/models/ClientUser";
import { UserModel } from "../../db/models/User";
import { removeFields } from "../../util/mongo";
import { Route } from "./";

export const users: Route = {
	method: 'get',
	path: '/status',
	handler: (server) => (req, res) => {
		return res.json({ guilds: 0, users: 0, commandsUsed: 0 });
	}
};
