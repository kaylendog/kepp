import { Response } from "express";

import { ServerErrorCreator } from "./ServerError";

export const BadRequest: ServerErrorCreator = (
	res: Response,
	details?: string,
) =>
	res.status(400).json({
		code: 1,
		msg: "400: Bad Request",

		details,
	});
