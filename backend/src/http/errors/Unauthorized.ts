import { Response } from "express";

import { ServerErrorCreator } from "./ServerError";

export const Unauthorized: ServerErrorCreator = (res: Response) =>
	res.status(401).json({
		code: 3,
		msg: "401: Unauthorized",
	});
