import { MESSAGE_EVENT } from './dispatch/MESSAGE';
import { READY_EVENT } from './dispatch/READY';
import { HELLO_EVENT } from './HELLO';
import { DispatchEvents, DispatchHandler, EventHandler, EventNames, EventTypes } from './types';

export const EventHandlers: EventHandler<EventTypes>[] = [HELLO_EVENT];
export const DispatchHandlers: DispatchHandler<any>[] = [
	READY_EVENT,
	MESSAGE_EVENT
];

export { EventTypes, EventHandler, EventNames };
