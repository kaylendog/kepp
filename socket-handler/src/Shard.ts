import { pack, unpack } from 'erlpack';
import { EventEmitter } from 'events';
import WebSocket from 'ws';

import { createLogger } from '../../packages/logging/src';
import { DispatchHandlers, EventHandlers } from './events/';
import {
	CommandTypes, DispatchEvents, DispatchHandler, EventHandler, EventNames, EventTypes,
	SocketEvent,
} from './events/types';
import { Manager } from './Manager';
import { waitForEvent } from './util/async';

interface ShardOptions {
	disabledEvents: [];
	gateway: string;
	socketOptions: WebSocket.ClientOptions;
	token: string;
}

const DEFAULT_SHARD_OPTIONS: ShardOptions = {
	disabledEvents: [],
	gateway: '',
	socketOptions: {},
	token: ''
};

/**
 * Represents a websocket connection to Discord.
 */
export class Shard extends EventEmitter {
	readonly options: ShardOptions;
	readonly logger = createLogger(this.id);

	readonly eventHandlers = new Map<EventTypes['op'], EventHandler<EventTypes>>(
		EventHandlers.map((h) => [h.op, h])
	);

	readonly dispatchEventHandlers = new Map<
		DispatchEvents['t'],
		DispatchHandler<DispatchEvents>
	>(DispatchHandlers.map((h) => [h.t, h]));

	public lastHeartbeatTimestamp = 0;
	public heartbeatInterval = 42150;
	public ws?: WebSocket;

	private heartbeat?: NodeJS.Timer;

	constructor(
		readonly manager: Manager,
		readonly id: number,
		config?: Partial<ShardOptions>
	) {
		super();
		this.options = { ...DEFAULT_SHARD_OPTIONS, ...config };
	}

	async connect() {
		// Connect to the gateway.
		this.ws = new WebSocket(this.options.gateway, this.options.socketOptions);
		await waitForEvent(this.ws, 'open');

		this.ws.on('message', (raw) => this._handlePacket(raw));

		await waitForEvent(this, 'ready');
	}

	/**
	 * Route a packet.
	 * @param raw
	 */
	private _handlePacket(raw: WebSocket.Data) {
		const parsed: EventTypes | DispatchEvents = this._decodePacket(raw);

		if (typeof parsed === 'object' && parsed.op !== undefined) {
			if (parsed.op === 0) {
				const handler = this.dispatchEventHandlers.get(parsed.t);
				if (handler) {
					handler.handler(this, parsed);
				}
			} else {
				const handler = this.eventHandlers.get(parsed.op);
				if (handler) {
					handler.handler(this, parsed);
				}
			}
		}
	}

	/**
	 * Packet decompression and ETF parsing.
	 * @param raw
	 *
	 * @todo Add support for zlib compression
	 */
	private _decodePacket(raw: WebSocket.Data) {
		let packed: Buffer;

		if (raw instanceof Buffer) {
			packed = raw;
		} else if (raw instanceof ArrayBuffer) {
			packed = Buffer.from(raw);
		} else if (raw instanceof Array) {
			packed = Buffer.concat(raw);
		} else {
			packed = Buffer.from(raw, 'utf-8');
		}

		return unpack(packed);
	}

	/**
	 * Send a command to the gateway.
	 * @param cmd
	 */
	public sendCommand(cmd: CommandTypes) {
		if (this.ws) {
			this.ws.send(pack(cmd));
		}
	}

	/**
	 * Send the Hello identification
	 */
	private _hello() {}

	/**
	 * Send the heartbeat command to the gateway.
	 */
	private _heartbeat() {
		this.sendCommand({ op: 1, d: {} });
	}

	/**
	 * Set the heartbeat interval with which the shard should ping the gateway.
	 * @param interval
	 */
	public setHeartbeatInterval(interval: number) {
		if (this.heartbeat) {
			clearInterval(this.heartbeat);
		}
		this.heartbeat = setInterval(() => this._heartbeat(), interval);
	}

	/**
	 * The token the shard is using to connect.
	 */
	get token() {
		return this.options.token;
	}
}
