import { GuildResolvable, SettingsProvider } from './SettingsProvider';

/**
 * An in-memory settings store.
 */
export class MemoryProvider<T> extends SettingsProvider<T> {
	readonly store: Map<string, T> = new Map();

	get(guild: GuildResolvable) {
		const resolved = this.resolve(guild);
		if (resolved) {
			return this.store.get(resolved.id) || ({} as T);
		}
		return {} as T;
	}

	set(guild: GuildResolvable, settings: T) {
		const resolved = this.resolve(guild);
		if (resolved) {
			this.store.set(resolved.id, settings);
		}
	}
}
