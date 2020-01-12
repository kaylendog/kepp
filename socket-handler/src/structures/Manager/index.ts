import { AxiosResponse } from "axios";

import { GetGatewayRequest } from "../../types/Requests";
import { waitFor, waitForEvent } from "../../util/async";
import { createLogger, Logger } from "../../util/logging";
import { RequestMaker } from "../../util/requests";
import { Shard, ShardConfig } from "../Shard";

export interface ManagerConfig {
	token: string;
	shards: number;
	shardConfig?: ShardConfig;
}

const DEFAULT_MANAGER_CONFIG: ManagerConfig = {
	token: process.env.TOKEN || '',
	shards: 0
};

/**
 * Class wrapping the shards.
 */
export class Manager {
	public config: ManagerConfig;
	public shards: Map<number, Shard>;
	public logger: Logger;

	constructor(config: Partial<ManagerConfig> = DEFAULT_MANAGER_CONFIG) {
		this.config = Object.assign({}, DEFAULT_MANAGER_CONFIG, config);
		if (this.config.token === '' || !this.token) {
			throw Error('No token specified.');
		}

		this.shards = new Map();

		this.logger = createLogger('manager');
	}

	get token(): string {
		return this.config.token;
	}

	/**
	 * Start the shards.
	 */
	async startShards(): Promise<void> {
		this.logger.debug(
			`socket-handler v${require('../../../package.json').version}`
		);

		const authenticateGatewayRequest: GetGatewayRequest = ((await RequestMaker({
			method: 'GET',
			url: '/gateway/bot',
			headers: { Authorization: `Bot ${this.token}` }
		}).catch((err) => {
			this.logger.error('Failed to identify with gateway:', err.message);
			return { data: {} };
		})) as AxiosResponse<GetGatewayRequest>).data;

		if (!authenticateGatewayRequest.url) {
			process.exit();
		}

		if (this.config.shards === 0) {
			this.config.shards = authenticateGatewayRequest.shards;
		}

		this.logger.debug(
			'Gateway authentication successful.',
			`Starting ${this.config.shards} shards...`
		);

		for (let i = 0; i < this.config.shards; i++) {
			const shard = new Shard(this, {
				id: i,
				url: authenticateGatewayRequest.url
			});

			this.logger.debug('Waiting for shard to enter READY state...');
			shard.connect();

			await waitForEvent(shard, 'ready');
			this.shards.set(i, shard);

			await waitFor(5e3);
		}

		this.logger.info(`Successfully started ${this.shards.size} shards.`);
	}
}
