import { EventHandler, HelloEvent } from './types';

/**
 * Event received by the shard during identification.
 */
export const HELLO_EVENT: EventHandler<HelloEvent> = {
	op: 10,
	handler: (shard, ev) => {
		shard.setHeartbeatInterval(ev.d.heartbeat_interval);
		shard.sendCommand({
			op: 2,
			d: {
				properties: { $browser: 'kepp', $device: 'kepp', $os: 'linux' },
				token: shard.token
			}
		});
	}
};
