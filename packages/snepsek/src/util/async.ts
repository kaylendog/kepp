import { EventEmitter } from 'events';

/**
 * Return an awaitable that will resolve in `x` ms.
 * @param x
 */
export const waitFor = (x: number): Promise<void> =>
	new Promise((res) => setTimeout(res, x));

/**
 * Return an awaitable that will resolve after the specified event is fired by the given object.
 * @param obj
 * @param event
 */
export const waitForEvent = (obj: EventEmitter, event: string): Promise<void> =>
	new Promise((res) => obj.once(event, res));
