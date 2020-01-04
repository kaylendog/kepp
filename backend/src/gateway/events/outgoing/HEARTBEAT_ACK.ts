import { OutgoingEventCreator, OutgoingEvents } from "./types";

/**
 * Handle heartbeat message.
 */
export const HEARTBEAT_ACK: OutgoingEventCreator<{}> = {
	op: OutgoingEvents.HEARTBEAT_ACK,
	handler: (socket) => {
		socket.send({ op: OutgoingEvents.HEARTBEAT_ACK, d: {} });
	},
};
