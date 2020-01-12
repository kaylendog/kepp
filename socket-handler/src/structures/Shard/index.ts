import { EventEmitter } from "events";

import { createLogger, Logger } from "../../util/logging";
import { Manager } from "../Manager";
import { Connection, ConnectionConfig } from "./Connection";
import { RedisClient, RedisClientConfig } from "./RedisClient";
import { Streamer, StreamerConfig } from "./Streamer";

export interface ShardConfig {
	id: number;
	url: string;
	token: string;

	streamerConfig?: StreamerConfig;
	connectionConfig?: ConnectionConfig;
	redisConfig?: RedisClientConfig;
}

const DEFAULT_SHARD_CONFIG: ShardConfig = {
	id: 0,
	url: "",
	token: "",
};

/**
 * Represents a sharded socket handler that connects to Discord.
 */
export class Shard extends EventEmitter {
	public readonly config: ShardConfig;

	public readonly streamer: Streamer;
	public readonly connection: Connection;
	public readonly redis: RedisClient;

	public readonly logger: Logger;

	constructor(
		readonly manager: Manager,
		config: Partial<ShardConfig> = DEFAULT_SHARD_CONFIG
	) {
		super();
		this.config = { ...DEFAULT_SHARD_CONFIG, ...config };

		this.streamer = new Streamer(this, this.config.streamerConfig);
		this.connection = new Connection(this, this.config.connectionConfig);
		this.redis = new RedisClient(this);

		this.logger = createLogger(this.id);
	}

	get id(): number {
		return this.config.id;
	}

	/**
	 * Connect to Discord
	 * @param url The specified gateway URL - defaults to `wws://gateway.discordapp.com`.
	 */
	async connect(): Promise<void> {
		this.redis.connect();
		await this.streamer.connect();
		await this.connection.connect();
	}
}
