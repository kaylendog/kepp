import { Channel, GuildChannel } from "../structures/channels";
import { ExistExtends } from "../util/types";
import { GuildQuery } from "./Guild";
import { MessageQuery } from "./Message";
import { Query, QueryTypes } from "./Query";

export interface ChannelResolvable<T extends Channel> {
	id: string;
	guildID: ExistExtends<T, GuildChannel, string>;
}

/**
 * Channel Query
 */
export class ChannelQuery<T extends Channel> extends Query<T> {
	public guild: ExistExtends<T, GuildChannel, GuildQuery> = (this.target
		.guildID
		? new GuildQuery(this.target.guildID as string)
		: undefined) as ExistExtends<T, GuildChannel, GuildQuery>;

	constructor(readonly target: ChannelResolvable<T>) {
		super(QueryTypes.Channel, target);
	}

	fetchMessage(id: string): MessageQuery<T> {
		return new MessageQuery({
			channelId: this.target.id,
			guildId: this.target.guildID,
			id,
		});
	}
}
