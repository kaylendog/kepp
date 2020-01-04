import { Socket } from "../../Socket";
import { IncomingSocketHandler } from "../incoming/types";

export enum DispatchEvents {
	UpdatePrefix = "UPDATE_PREFIX",
	UpdatePermission = "UPDATE_PERMISSION",
}

export interface DispatchSocketMessage<D> {
	op: 0;
	d: D;
	t: DispatchEvents;
}

export interface DispatchSocketHandler<D> {
	t: DispatchEvents;
	handler: (socket: Socket, data: D) => any;
}

/**
 * Handle authorization requests.
 */
export const DispatchHandler: IncomingSocketHandler<{}> = {
	op: 0,
	handler: (socket, ev) => {},
};
