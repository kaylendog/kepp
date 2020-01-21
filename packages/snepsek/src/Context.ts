import { Message } from 'eris';

import { Client } from './Client';
import { ChannelTypes } from './types/Discord';

/**
 * Wrapper class for the context in which a command is executed.
 */
export class Context {
	/**
	 * The user who ran the command.
	 */
	readonly dispatcher = this.message.author;

	/**
	 * The dispatcher's member object if the command was run in a guild.
	 */
	readonly member = this.message.member;

	constructor(readonly client: Client, readonly message: Message) {}

	/**
	 * The guild in which the command was executed.
	 */
	get guild() {
		return this.message.member ? this.message.member.guild : undefined;
	}

	/**
	 * Whether or not the command was executed in a DM channel.
	 */
	get isDM() {
		return (
			this.message.channel.type === ChannelTypes.DM ||
			this.message.channel.type === ChannelTypes.Group
		);
	}
}
