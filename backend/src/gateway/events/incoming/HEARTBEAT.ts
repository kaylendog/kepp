import { OutgoingEvents } from "../outgoing/types";
import { IncomingEvents, IncomingSocketHandler } from "./types";

/**
 * Handle authorization requests.
 */
export const HEARTBEAT: IncomingSocketHandler<{}> = {
	op: IncomingEvents.HEARTBEAT,
	handler: (socket) => {
		return socket.fire(OutgoingEvents.HEARTBEAT_ACK, {});
	},
};
