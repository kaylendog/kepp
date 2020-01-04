import { HEARTBEAT_ACK } from "./HEARTBEAT_ACK";
import { HELLO } from "./HELLO";
import { OutgoingEventCreator, OutgoingEvents } from "./types";

// Import events here.
const OutgoingEventCreatorArray = [HEARTBEAT_ACK, HELLO];

export const OutgoingEventCreators = new Map<
	OutgoingEvents,
	OutgoingEventCreator<any>
>(OutgoingEventCreatorArray.map((creator) => [creator.op, creator]));
