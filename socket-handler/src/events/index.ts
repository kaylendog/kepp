import { HELLO_EVENT } from './HELLO';
import { READY_EVENT } from './READY';
import { DispatchEvents, DispatchHandler, EventHandler, EventNames, EventTypes } from './types';

export const EventHandlers: EventHandler<EventTypes>[] = [HELLO_EVENT];
export const DispatchHandlers: DispatchHandler<DispatchEvents>[] = [
	READY_EVENT
];

export { EventTypes, EventHandler, EventNames };
