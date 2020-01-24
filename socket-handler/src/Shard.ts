import { unpack } from 'erlpack';
import { EventEmitter } from 'events';
import WebSocket from 'ws';
import { deflateRawSync, deflateSync } from 'zlib';

import { createLogger } from '../../packages/logging/src';
import { waitForEvent } from './util/async';

interface ShardOptions {
	disabledEvents: [];
	gateway: string;
	socketOptions: WebSocket.ClientOptions;
}

const DEFAULT_SHARD_OPTIONS: ShardOptions = {
	disabledEvents: [],
	gateway: '',
	socketOptions: {}
};

/**
 * Represents a websocket connection to Discord.
 */
export class Shard extends EventEmitter {
	readonly options: ShardOptions;
	readonly logger = createLogger(this.id);

	public ws?: WebSocket;

	constructor(readonly id: number, config?: Partial<ShardOptions>) {
		super();
		this.options = { ...DEFAULT_SHARD_OPTIONS, ...config };
	}

	async connect() {
		// Connect to the gateway.
		this.ws = new WebSocket(this.options.gateway, this.options.socketOptions);
		await waitForEvent(this.ws, 'open');

		this.ws.on('message', (raw) => this._decodePacket(raw));
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
	 * Send the Hello identification
	 */
	private _hello() {}
}
