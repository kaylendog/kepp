import { Shard } from '../Shard';

export type EventNames = 'READY';

export interface SocketEvent {
	d: any;
	op: number;
	s?: number;
	t?: EventNames;
}

/**
 * Received Events
 */

export interface HelloEvent extends SocketEvent {
	d: {
		heartbeat_interval: number;
	};
	op: 10;
}

export type EventTypes = HelloEvent;

// Dispatch Events
export interface DispatchEvent extends SocketEvent {
	d: {};
	op: 0;
	s: number;
	t: EventNames;
}

export interface ReadyEvent extends DispatchEvent {
	t: 'READY';
}

export type DispatchEvents = ReadyEvent;

/**
 * Sent events
 */

interface HeartbeatCommand extends SocketEvent {
	op: 1;
}

interface IdentifyCommand extends SocketEvent {
	op: 2;
	d: {
		token: string;
		properties: {
			$os: string;
			$browser: string;
			$device: string;
		};
	};
}

export type CommandTypes = HeartbeatCommand | IdentifyCommand;

/**
 * A socket event handler.
 */
export type EventHandler<T extends EventTypes> = {
	op: T['op'];
	handler: (shard: Shard, event: T) => void;
};

/**
 * A dispatch event handler.
 */
export type DispatchHandler<T extends DispatchEvents> = {
	t: EventNames;
	handler: (shard: Shard, event: T) => void;
};
