import { Response } from "express";

import { ServerErrorCreator } from "./ServerError";

export const ServersideError: ServerErrorCreator = (
	res: Response,
	details?: string,
) =>
	res.status(500).json({
		code: 4,
		msg: "500: Server Error",

		details,
	});
