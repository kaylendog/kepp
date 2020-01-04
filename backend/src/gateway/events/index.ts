import * as Dispatch from "./dispatch";
import * as Incoming from "./incoming";
import { IncomingEvents } from "./incoming/types";
import * as Outgoing from "./outgoing";
import { OutgoingEvents } from "./outgoing/types";

export { Dispatch, Incoming, Outgoing };

export type Opcodes = IncomingEvents | OutgoingEvents;

/**
 * An enum containing error codes.
 */
export enum ErrorCodes {
	DEFAULT = 1000,

	UNKNOWN_OPCODE = 4001,
	DECODE_ERROR = 4002,
	NOT_AUTHORIZED = 4003,
	AUTHORIZATION_FAILED = 4004,
	ALREAY_AUTHORIZED = 4005,
	AUTHORIZATION_TIMEOUT = 4006,
}
