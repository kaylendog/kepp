import { Channel, GuildChannel } from '../structures/channels';
import { Message } from '../structures/Message';
import { ExistExtends } from '../util/types';
import { GuildQuery } from './Guild';
import { Query, QueryTypes } from './Query';
import { UserQuery } from './User';

export interface MessageResolvable<T extends Channel> {
	id: string;
	channelId: string;
	guildId: ExistExtends<T, GuildChannel, string>;
}

export declare interface MessageQuery<T extends Channel>
	extends Query<Message<T>> {
	guild: ExistExtends<T, GuildChannel, GuildQuery>;
}

/**
 * Message Query
 */
export class MessageQuery<T extends Channel> extends Query<Message<T>> {
	public author = new UserQuery({ message: this.id });

	public guild: ExistExtends<T, GuildChannel, GuildQuery> = (this.target.guildId
		? new GuildQuery(this.target.guildId as string)
		: undefined) as ExistExtends<T, GuildChannel, GuildQuery>;

	public member: ExistExtends<T, GuildChannel, GuildQuery> = (this.target
		.guildId
		? new GuildQuery(this.target.guildId as string)
		: undefined) as ExistExtends<T, GuildChannel, GuildQuery>;

	public content = async () => (await this).content;

	constructor(readonly target: MessageResolvable<T>) {
		super(QueryTypes.Message, target);
	}

	// Getters

	/**
	 * The ID of the Guild the message was sent in.
	 */
	get guildId() {
		return this.target.guildId;
	}

	/**
	 * The message ID
	 */
	get id() {
		return this.target.id;
	}

	/**
	 * The
	 */
	get channelId() {
		return this.target.channelId;
	}
}
