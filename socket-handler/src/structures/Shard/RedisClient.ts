import { createClient, RedisClient as Client } from "redis";

import { Shard } from "./";

export interface RedisClientConfig {
	host: string;
	port: number;
}

const DEFAULT_REDIS_CLIENT_CONFIG: RedisClientConfig = {
	host: "127.0.0.1",
	port: 6368,
};

export class RedisClient {
	public config: RedisClientConfig;

	private client?: Client;

	constructor(
		readonly shard: Shard,
		config: Partial<RedisClientConfig> = DEFAULT_REDIS_CLIENT_CONFIG
	) {
		this.config = { ...DEFAULT_REDIS_CLIENT_CONFIG, ...config };
	}

	/**
	 * Connect to the Redis server.
	 * @param uri
	 */
	connect() {
		this.client = createClient().on("error", (err) =>
			this.shard.logger.error(err.message)
		);
	}
}
