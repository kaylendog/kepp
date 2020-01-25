import { Client as ErisClient, ClientOptions as ErisClientOptions } from 'eris';
import { existsSync, lstatSync, readdirSync } from 'fs';
import * as path from 'path';

import { createLogger } from '../../../utils/src';
import { Module } from './Module';
import { MemoryProvider } from './provider/MemoryProvider';
import { SettingsProvider } from './provider/SettingsProvider';
import { waitForEvent } from './util/async';

enum ConnectionStatus {
	Connecting = 'CONNECTING',
	Ready = 'READY',
	Disconnected = 'DISCONNECTED',
	Reconnecting = 'RECONNECTING'
}

export interface ProviderSettings {}

interface ClientOptions extends ErisClientOptions {}

const DEFAULT_CLIENT_OPTIONS: ClientOptions = {};

/**
 * Module management class.
 */
export class Client extends ErisClient {
	readonly modules: Map<string, Module> = new Map();
	readonly logger = createLogger('client');

	provider: SettingsProvider<ProviderSettings> = new MemoryProvider<
		ProviderSettings
	>(this);

	connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;

	readonly options: ClientOptions;

	constructor(opts: Partial<ClientOptions>) {
		super('', opts);
		this.options = { ...DEFAULT_CLIENT_OPTIONS, ...opts };

		this.logger.info(`snepsek v${require('../package.json').version}`);

		process.on('SIGINT', () => this.stop());
		this.on('error', this.logger.error);
	}

	/**
	 * Stop the bots
	 */
	async stop() {
		this.logger.info('Cleaning up...');

		await this.modulesWillUnload();
		this.disconnect({ reconnect: false });
		await this.modulesDidUnload();

		this.logger.info('Done.');
		process.exit();
	}

	/**
	 * Start modules
	 */
	async start(token = this.token) {
		this.token = token;

		if (!this.token) {
			this.logger.warn('No token specified - cannot log in.');
			process.exit(1);
		}

		await this.provider.init();
		this.logger.debug('SettingsProvider initialized.');

		await this.preInitializeModules();

		this.logger.debug(`Using access token '${this.token}'...`);
		this.connectionStatus = ConnectionStatus.Connecting;

		await super.connect();

		this.connectionStatus = ConnectionStatus.Ready;

		await waitForEvent(this, 'ready');

		this.logger.debug('Connected to Discord.');
		await this.postInitializeModules();

		this.logger.info(
			`Logged in as: ${this.user.username}#${this.user.discriminator} (${this.modules.size} modules loaded)`
		);
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
		this.logger.debug(
			`Looking for modules in '${directoryPath}' - recursive=${recursive}`
		);

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

			if (!ext || !/[jt]s/.test(ext)) {
				return;
			}

			try {
				const potentialModule = await import(filePath);

				for (const entry of Object.values<any>(potentialModule)) {
					if (entry.prototype && entry.prototype instanceof Module) {
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
		for (const mdl of this.modules) {
			await mdl[1].moduleWillInit();
		}
		this.logger.success('Modules pre-initialized.');
	}

	/**
	 * Post-initialize modules attached to the client.
	 */
	async postInitializeModules() {
		for (const mdl of this.modules) {
			await mdl[1].moduleDidInit();
		}

		this.logger.success('Modules post-initialized.');
	}

	/**
	 * Modify the SettingsProvider attached to the client.
	 * @param provider
	 */
	useProvider<T extends ProviderSettings>(
		provider: new (client: this) => SettingsProvider<T>
	) {
		this.provider = new provider(this);
		return this;
	}

	/**
	 * Unload modules attached to the client.
	 */
	async modulesWillUnload() {
		for (const mdl of this.modules) {
			await mdl[1].moduleWillUnload();
		}

		this.logger.success('Modules unloaded.');
	}

	/**
	 * Stop modules attached to the client.
	 */
	async modulesDidUnload() {
		for (const mdl of this.modules) {
			await mdl[1].moduleDidUnload();
		}

		this.logger.success('Modules stopped.');
	}
}
