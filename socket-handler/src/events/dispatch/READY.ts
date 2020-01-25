import { DispatchHandler, ReadyEvent } from '../types';

export const READY_EVENT: DispatchHandler<ReadyEvent> = {
	t: 'READY',
	handler: (shard, ev) => {
		shard.emit('ready');
	}
};
