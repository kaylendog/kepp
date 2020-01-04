import { NextFunction, Request, Response } from "express";

import { ClientUserModel } from "../../db/models/ClientUser";
import { UserModel } from "../../db/models/User";
import { ServersideError, Unauthorized } from "../errors";

/**
 * Require the request to be authorized with a bearer token.
 * @param req Request
 * @param res Response
 * @param next Next
 */
export const requireAuthentication = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.header('Authorization');
	if (!authHeader) {
		Unauthorized(res);
		return next(false);
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		Unauthorized(res);
		return next(false);
	}

	const user = await ClientUserModel.findOne({ token });
	if (!user) {
		Unauthorized(res);
		return next(false);
	}

	return next();
};

/**
 * Retrieve token from request
 * @param req Request
 */
export const fetchToken = (req: Request) => {
	const authHeader = req.header('Authorization');
	if (!authHeader) {
		return null;
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		return null;
	}

	return token;
};

/**
 * Fetches the user given an authorized request
 * @param req Request
 * @param res Response
 */
export const fetchUser = async (req: Request, res: Response) => {
	const token = fetchToken(req);
	if (!token) {
		ServersideError(res);
		return false;
	}

	const clientUser = await ClientUserModel.findOne({ token });

	if (!clientUser) {
		ServersideError(res);
		return false;
	}

	const user = await UserModel.findById(clientUser._id);

	if (!user) {
		ServersideError(res);
		return false;
	}

	return user;
};
