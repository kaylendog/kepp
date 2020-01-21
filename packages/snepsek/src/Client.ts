import { Client as ErisClient, ClientOptions } from 'eris';
import { existsSync, lstatSync, readdirSync } from 'fs';
import * as path from 'path';

import { Logger } from '../../logging/dist';
import { Module } from './Module';
import { waitForEvent } from './util/async';

enum ConnectionStatus {
	Connecting = 'CONNECTING',
	Ready = 'READY',
	Disconnected = 'DISCONNECTED',
	Reconnecting = 'RECONNECTING'
}

/**
 * Module management class.
 */
export class Client extends ErisClient {
	modules: Map<string, Module> = new Map();
	logger: Logger = new Logger('Manager');

	connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;

	constructor(opts: ClientOptions) {
		super('', opts);

		process.on('SIGINT', () => this.stop());
	}

	/**
	 * Stop the bots
	 */
	async stop() {
		this.logger.debug('Unloading modules...');
		this.disconnect({ reconnect: false });
		process.exit();
	}

	/**
	 * Start modules
	 */
	async start(token = this.token) {
		this.token = token;

		await this.preInitializeModules();

		this.logger.debug(`Using access token '${this.token}'...`);
		this.connectionStatus = ConnectionStatus.Connecting;

		await super.connect();

		this.logger.debug('Connected to Discord - waiting for ready...');
		this.connectionStatus = ConnectionStatus.Ready;

		await waitForEvent(this, 'ready');
		await this.postInitializeModules();

		this.logger.info(
			`Logged in as: ${this.user.username}#${this.user.discriminator}`
		);
		this.logger.info(`Running snepsek v${require('../package.json').version}`);
	}

	/**
	 * Add a module to the Client. It is guaranteed that modules will be intialized
	 * in the order that they appear in the array.
	 *
	 * @param module
	 */
	async addModule(...modules: Array<new (client: Client) => Module>) {
		for (const module of modules) {
			const constructedModule = new module(this);

			constructedModule.getCommands();

			this.modules.set(module.name, constructedModule);
			if (this.connectionStatus === ConnectionStatus.Ready) {
				await constructedModule.moduleWillInit();
				await constructedModule.moduleDidInit();
			}
		}
	}

	/**
	 * Will attempt to load modules in the given directory. Any valid function
	 *
	 * @param directoryPath
	 */
	async loadModulesIn(directoryPath: string, recursive = false) {
		if (!path.isAbsolute(directoryPath)) {
			directoryPath = path.resolve(process.cwd(), directoryPath);
		}

		if (!existsSync(directoryPath) || !lstatSync(directoryPath).isDirectory()) {
			throw Error(
				'Invalid module path - could not resolve path, or path is not a directory.'
			);
		}

		const paths = readdirSync(directoryPath);

		for (const file of paths) {
			const filePath = path.resolve(directoryPath, file);

			// Recursive load if enabled.
			if (recursive && lstatSync(filePath).isDirectory()) {
				await this.loadModulesIn(filePath, true);
				continue;
			}

			const ext = file.split('.').pop();

			if (!ext || /[jt]s/.test(ext)) {
				return;
			}
			try {
				const potentialModule = import(filePath);

				for (const entry of Object.values(potentialModule)) {
					if (entry.prototype instanceof Module) {
						await this.addModule(entry);
					}
				}
			} catch (err) {
				throw Error(err);
			}
		}
	}

	/**
	 * Pre-initialize modules attached to the client.
	 */
	async preInitializeModules() {
		let i = 1;
		for (const mdl of this.modules) {
			this.logger.debug(`[${i}/${this.modules.size}] ${mdl[1].name}`);

			if (mdl[1].moduleWillInit) {
				await mdl[1].moduleWillInit();
			}
		}
		this.logger.success('Modules pre-initialized.');
		i++;
	}

	/**
	 * Post-initialize modules attached to the client.
	 */
	async postInitializeModules() {
		for (const mdl of this.modules) {
			if (mdl[1].moduleDidInit) {
				await mdl[1].moduleDidInit();
			}
		}

		this.logger.success('Modules post-initialized.');
	}
}
