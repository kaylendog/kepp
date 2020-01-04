import { Router } from "express";

import { ClientUserModel } from "../../db/models/ClientUser";
import { UserModel } from "../../db/models/User";
import { removeFields } from "../../util/mongo";
import { ServersideError } from "../errors";
import { fetchToken, requireAuthentication } from "../util/auth";
import { Route } from "./";

export const users: Route = {
	method: 'use',
	path: '/users',
	handler: () =>
		Router().get('/@me', requireAuthentication, async (req, res) => {
			const token = fetchToken(req);
			if (!token) {
				return ServersideError(res);
			}

			const clientUser = await ClientUserModel.findOne({ token });

			if (!clientUser) {
				return ServersideError(res);
			}

			const user = await UserModel.findById(clientUser._id);

			if (!user) {
				return ServersideError(res);
			}

			return res.json(removeFields(user));
		})
};
