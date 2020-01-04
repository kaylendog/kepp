import { Socket } from "../../Socket";
import { DispatchEvents } from "../dispatch";

export enum OutgoingEvents {
	DISPATCH = 0,
	HELLO = 10,
	HEARTBEAT_ACK = 11,
}

export interface OutgoingSocketMessage<D> {
	op: OutgoingEvents;
	d: D;
	t?: DispatchEvents;
}

export interface OutgoingEventCreator<D> {
	op: OutgoingEvents;
	handler: (socket: Socket, args: D) => any;
}
