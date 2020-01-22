import { Guild } from 'eris';

import { Client } from '../Client';

export type GuildResolvable = string | Guild;

/**
 * Represents a structure which provides guild configuration to the client.
 */
export abstract class SettingsProvider<T> {
	constructor(readonly client: Client) {}

	abstract get(guild: GuildResolvable): Promise<T> | T;
	abstract set(guild: GuildResolvable, settings: T): Promise<void> | void;

	/**
	 * Reaolve a guild.
	 *
	 * @param guildResolvable
	 */
	resolve(guildResolvable: GuildResolvable) {
		if (guildResolvable instanceof Guild) {
			return guildResolvable;
		}
		return this.client.guilds.get(guildResolvable);
	}

	/**
	 * Update a guild's settings
	 * @param id
	 * @param update
	 */
	async update(id: GuildResolvable, update: T) {
		return this.set(id, { ...(await this.get(id)), ...update });
	}
}
