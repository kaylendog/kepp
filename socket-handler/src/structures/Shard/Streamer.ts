import { EventEmitter } from "events";
import { Client, connect } from "ts-nats";

import { Shard } from "./";

export interface StreamerConfig {
	servers?: string[];
}

const DEFAULT_STREAMER_CONFIG: StreamerConfig = {};

/**
 * Represents the NATS data streamer for each shard.
 */
export class Streamer extends EventEmitter {
	public shard: Shard;
	public config: StreamerConfig;

	private nats?: Client;

	constructor(
		shard: Shard,
		config: Partial<StreamerConfig> = DEFAULT_STREAMER_CONFIG
	) {
		super();
		this.shard = shard;
		this.config = Object.assign({}, DEFAULT_STREAMER_CONFIG, config);
	}

	/**
	 * Connect to the NATS server.
	 */
	async connect(): Promise<void> {
		this.nats = await connect().catch((err) => {
			this.shard.logger.error(err.message);
			return undefined;
		});
	}
}
