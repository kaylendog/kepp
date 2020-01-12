import colors from "colors/safe";
import { EventEmitter } from "events";
import WebSocket from "ws";

import {
	HeartbeatEvent, HelloEvent, IdentifyCommand, ReceivedEvent, SentCommand,
} from "../../types/WS";
import { Shard } from "./";
import * as SocketEvents from "./events";

export interface ConnectionConfig {
	encoding: 'json' | 'etf';
	compress: boolean;
}

/**
 * The default config of a shard's connection.
 */
const DEFAULT_CONNECTION_CONFIG: ConnectionConfig = {
	encoding: 'json',
	compress: false
};

export enum ConnectionStatus {
	DISCONNECTED = 'DISCONNECTED',
	CONNECTING = 'CONNECTING',
	READY = 'READY',
	RECONNECTING = 'RECONNECTING'
}

export declare interface Connection extends EventEmitter {
	on(event: 'heartbeat', listener: (data: HelloEvent['d']) => void): this;
	on(event: 'identify', listener: () => void): this;
}

/**
 * Represents a shard's connection to the gateway.
 */
export class Connection extends EventEmitter {
	public connected = false;
	public connectionStatus = ConnectionStatus.DISCONNECTED;

	public readonly config = DEFAULT_CONNECTION_CONFIG;

	public heartbeatTimeout?: NodeJS.Timer;
	public heartbeatDelay?: number;

	public readonly handlers: Map<
		number,
		SocketEvents.EventHandler<any>
	> = new Map(SocketEvents.HANDLERS.map((v) => [v.op, v]));

	private ws?: WebSocket;

	constructor(
		readonly shard: Shard,
		config: Partial<ConnectionConfig> = DEFAULT_CONNECTION_CONFIG
	) {
		super();
		this.config = { ...DEFAULT_CONNECTION_CONFIG, ...config };

		this.on('heartbeat', () =>
			this.sendSocketMessage<HeartbeatEvent>({ op: 1, d: {} })
		);
		this.on('identify', () =>
			this.sendSocketMessage<IdentifyCommand>({
				op: 2,
				d: {
					token: this.shard.manager.config.token,
					shard: [this.shard.id, this.shard.manager.config.shards],
					properties: {
						$browser: 'murrlink',
						$device: 'murrlink',
						$os: 'linux'
					}
				}
			})
		);
	}

	/**
	 * URL to use when connecting.
	 */
	get url(): string {
		return `${this.shard.config.url}?v=6&encoding=${this.config.encoding}`;
	}

	/**
	 * Connect to the gateway.
	 * @param url
	 */
	async connect(url = this.url): Promise<void> {
		this.ws = new WebSocket(url);
		this.setupSocketHandlers(this.ws);
	}

	public sendSocketMessage<T extends SentCommand>(ev: T): void {
		if (!this.ws) {
			return;
		}
		this.ws.send(JSON.stringify(ev));
	}

	private setupSocketHandlers(ws: WebSocket): void {
		ws.on('message', (data) => {
			this.handleSocketMessage(data);
		})
			.on('error', (err) => this.shard.logger.error(err.message))
			.on('close', (code) => {
				this.shard.logger.error('Socket unexpectedly closed:', code);
				this.connectionStatus = ConnectionStatus.RECONNECTING;

				this.connect();
			});
	}

	/**
	 * Handle a message from the gateway.
	 * @param data
	 */
	private parseSocketMessage(data: string): ReceivedEvent {
		if (this.config.encoding === 'etf') {
			return this.parseEtfMessage(data);
		} else {
			return this.parseJsonMessage(data);
		}
	}

	/**
	 * Parse an ETF-encoded socket message.
	 * @param data
	 */
	private parseEtfMessage(data: string): ReceivedEvent {
		return {} as ReceivedEvent;
	}

	/**
	 * Parse a JSON-encoded socket message.
	 * @param data
	 */
	private parseJsonMessage(data: string): ReceivedEvent {
		return JSON.parse(data) as ReceivedEvent;
	}

	private handleSocketMessage(data: WebSocket.Data): void {
		const decodedMessage = this.parseSocketMessage(data.toString());

		const handler = this.handlers.get(decodedMessage.op);
		if (handler) {
			handler.handler(this.shard, decodedMessage);
		}
	}
}
