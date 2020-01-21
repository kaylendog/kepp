import { Guild } from 'eris';

import { Client } from '../Client';

type GuildResolvable = string | Guild;

/**
 * Represents a structure which provides guild configuration to the client.
 */
export abstract class SettingsProvider<T> {
	constructor(readonly client: Client) {}

	abstract get(): Promise<T> | T;
	abstract set(guild: T): Promise<void> | void;

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

	update(id: string) {}
}
