import { env } from "~/env";

import { ObjectFromSchema } from "../../../config/validation";
import { ErrorCodes } from "../../events";
import { IncomingEvents, IncomingSocketHandler } from "./types";

const IdentifyEventSchema = {
	token: String
};

/**
 * Handle authorization requests.
 */
export const IDENTIFY: IncomingSocketHandler<ObjectFromSchema<
	typeof IdentifyEventSchema
>> = {
	op: IncomingEvents.IDENTIFY,
	handler: (socket, ev) => {
		if (!ev.token) {
			return socket.close(ErrorCodes.UNKNOWN_OPCODE);
		}

		if (ev.token === env.TOKEN) {
			return socket.authorize(true);
		}

		return socket.close(ErrorCodes.AUTHORIZATION_FAILED);
	},
	validationSchema: IdentifyEventSchema
};
