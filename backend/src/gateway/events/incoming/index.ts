import { HEARTBEAT } from "./HEARTBEAT";
import { IDENTIFY } from "./IDENTIFY";
import { IncomingEvents, IncomingSocketHandler } from "./types";

// Import events here.
const IncomingSocketHandlerArray = [IDENTIFY, HEARTBEAT];

export const IncomingSocketHandlers = new Map<
	IncomingEvents,
	IncomingSocketHandler<any>
>(IncomingSocketHandlerArray.map((h) => [h.op, h]));
