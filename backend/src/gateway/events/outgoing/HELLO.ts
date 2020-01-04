import { OutgoingEventCreator, OutgoingEvents } from "./types";

/**
 * Handle heartbeat message.
 */
export const HELLO: OutgoingEventCreator<{}> = {
	op: OutgoingEvents.HELLO,
	handler: (socket) => {
		socket.send({ op: OutgoingEvents.HELLO, d: {} });
	},
};
