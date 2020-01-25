import { DispatchHandler, MessageEvent } from '../types';

export const MESSAGE_EVENT: DispatchHandler<MessageEvent> = {
	t: 'MESSAGE_CREATE',
	handler: (shard, ev) => {}
};
