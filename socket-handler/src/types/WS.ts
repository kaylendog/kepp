export interface SocketMessage {
	op: number;
	d: {};
	s?: number;
	t?: DispatchEvents;
}

export interface DispatchEvent extends SocketMessage {
	op: number;
	d: {};
	s: number;
	t: DispatchEvents;
}

export enum DispatchEvents {
	CHANNEL_CREATE = 'CHANNEL_CREATE',
	CHANNEL_UPDATE = 'CHANNEL_UPDATE',
	CHANNEL_DELETE = 'CHANNEL_DELETE',
	READY = 'READY',
	GUILD_CREATE = 'GUILD_CREATE',
	PRESENCE_UPDATE = 'PRESENCE_UPDATE'
}
