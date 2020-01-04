import { Response } from "express";

import { ServerErrorCreator } from "./ServerError";

export const NotFound: ServerErrorCreator = (res: Response) =>
	res.status(404).json({
		code: 0,
		msg: `404: Not Found`,
	});
