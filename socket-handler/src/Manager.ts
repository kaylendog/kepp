import { AxiosResponse } from 'axios';
import { spawnSync } from 'child_process';
import { resolve } from 'url';

import { createLogger } from '../../packages/logging/src';
import { Shard } from './Shard';
import { GetGatewayRequest } from './types/Requests';
import { waitFor, waitForEvent } from './util/async';
import { RequestMaker } from './util/requests';

export interface ManagerOptions {
	token: string;
	overrideShardCount?: number;
	gatewayQuery: string;
}

const DEFAULT_MANAGER_OPTIONS: ManagerOptions = {
	token: process.env.TOKEN || '',
	gatewayQuery: '?v=6&encoding=etf'
};

/**
 * Represents the Sharding Manager.
 */
export class Manager {
	readonly logger = createLogger('Manager');
	readonly options: ManagerOptions;
	readonly shards = new Map<number, Shard>();

	public shardCount = 0;

	constructor(options?: Partial<ManagerOptions>) {
		this.logger.info(`socket-handler v${require('../package.json').version}`);

		this.options = { ...DEFAULT_MANAGER_OPTIONS, ...options };
		if (this.options.token === '' || !this.token) {
			this.logger.error('No access token specified - cannot connect.');
			process.exit(1);
		}
	}

	get token(): string {
		return this.options.token;
	}

	/**
	 * Start the shards.
	 */
	async startShards(): Promise<void> {
		const gateway = await this.getGateway();
		gateway.url = `${gateway.url}/${this.options.gatewayQuery}`;

		if (!gateway.url) {
			process.exit();
		}

		if (this.shardCount === 0) {
			this.shardCount = gateway.shards;
		}

		this.logger.info(
			`Using gateway: '${gateway.url}', shards: ${this.shardCount}`
		);

		for (let i = 0; i < this.shardCount; i++) {
			const shard = new Shard(i, { gateway: gateway.url });
			this.shards.set(i, shard);

			// Wait for shard to start
			await shard.connect();
			await waitFor(5e3);
		}
	}

	/**
	 * Make a request to the Discord API to fetch the gateway endpoint.
	 */
	async getGateway() {
		return ((await RequestMaker({
			method: 'GET',
			url: '/gateway/bot',
			headers: { Authorization: `Bot ${this.token}` }
		}).catch((err) => {
			this.logger.error('Failed to resolve gateway:', err.message);
			return { data: {} };
		})) as AxiosResponse<GetGatewayRequest>).data;
	}
}
