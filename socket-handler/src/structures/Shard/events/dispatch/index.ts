import { EventHandler } from "../";
import { DispatchEvent } from "../../../../types/WS";
import { ReadyDispatchHandler } from "./READY";

const DispatchEventHandlers: EventHandler<DispatchEvent>[] = [
	ReadyDispatchHandler
];

const DispatchEvents = new Map<string, EventHandler<DispatchEvent>>(
	DispatchEventHandlers.map((v) => [v.t as string, v])
);

export const DispatchEventHandler: EventHandler<DispatchEvent> = {
	op: 0,
	handler: (shard, ev) => {
		const handler = DispatchEvents.get(ev.t);
		if (handler) {
			handler.handler(shard, ev);
		}
	}
};
