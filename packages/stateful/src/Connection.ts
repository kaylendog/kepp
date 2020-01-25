import { EventEmitter } from 'events';
import { ClientOpts, createClient } from 'redis';

import { createLogger, waitForEvent } from '../../../utils/src';

interface ConnectionOptions {
	redisOptions: ClientOpts;
}

const DEFAULT_CONNECTION_OPTIONS: ConnectionOptions = {
	redisOptions: {}
};

export class Connection extends EventEmitter {
	readonly logger = createLogger('redis');
	readonly options: ConnectionOptions;

	redis = createClient();

	constructor(options: Partial<ConnectionOptions>) {
		super();

		this.options = { ...DEFAULT_CONNECTION_OPTIONS, ...options };
	}

	/**
	 * Connect to Redis.
	 */
	async connect() {
		this.redis = createClient(this.options.redisOptions);

		waitForEvent(this.redis, 'ready');
	}

	private _attachRedisHandlers() {
		this.redis.on('error', (err) => this.logger.error(err));
	}
}
