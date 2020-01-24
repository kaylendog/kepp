import { Manager } from './Manager';

interface LoadBalancerGuildInfo {
	size: number;
	workerId: number;
}

/**
 * Represents the structure that handles event balancing.
 */
export class LoadBalancer {
	public readonly guilds: Map<string, LoadBalancerGuildInfo> = new Map();
	public readonly routedWorkerPaths: Map<string, number> = new Map();

	constructor(readonly manager: Manager) {}

	/**
	 * Add a guild to the load balancer
	 * @param id
	 * @param count
	 */
	addGuild(id: string, size: number) {
		if (this.guilds.has(id)) {
			return;
		}

		// Target the guild to the least active worker.
		const workerId = this.findLeastActiveWorker();
		this._addGuildToWorker({ size, workerId });
	}

	/**
	 * Remove a guild from the load balancer.
	 * @param id
	 */
	removeGuild(id: string) {
		this.guilds.delete(id);
	}

	/**
	 * Get the total number of shards added to the manager.
	 */
	get shardCount() {
		return this.manager.shards.size;
	}

	get workerCount() {
		return 1;
	}

	/**
	 *
	 */
	private _addGuildToWorker(guild: LoadBalancerGuildInfo) {
		guild.workerId;
	}

	/**
	 * Find the least active worker.
	 */
	findLeastActiveWorker() {
		let minimumWorkerId: string;
		let minimumWorkerGuildCount: number = Infinity;

		for (const worker of this.routedWorkerPaths) {
			if (worker[1] < minimumWorkerGuildCount) {
				minimumWorkerGuildCount = minimumWorkerGuildCount;
				minimumWorkerId = worker[0];
			}
		}

		return minimumWorkerGuildCount;
	}

	/**
	 * Scale the worker pool
	 */
	scale(targetSize: number) {
		// Delete old paths
		this.routedWorkerPaths.forEach((v, k) => this.routedWorkerPaths.delete(k));

		const guilds = Array.from(this.guilds);
		guilds.sort((a, b) => a[1].size - b[1].size);

		guilds.forEach((entry) => this._addGuildToWorker(entry[1]));
	}
}
