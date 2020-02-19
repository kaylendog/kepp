import { Message, MessageContent, MessageFile } from 'eris';

import { Client } from '../Client';
import { PagedEmbed, PagedEmbedPage } from '../structures/PagedEmbed';
import { ChannelTypes } from '../types/Discord';

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

	/**
	 * The channel in which the command was run.
	 */
	readonly channel = this.message.channel;

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

	/**
	 * Reply to the message
	 * @param content
	 * @param file
	 */
	reply(content: MessageContent, file?: MessageFile) {
		if (typeof content === 'string') {
			content = {
				content: `<@${this.message.author.id}>, ${content}`
			};
		}
		return this.message.channel.createMessage(
			{ content: `<@${this.message.author.id}>`, ...content },
			file
		);
	}

	/**
	 * Create a paged embed from an array of pages, and attach it to this context.
	 * @param pages
	 */
	createPagableEmbed(...pages: PagedEmbedPage[]) {
		new PagedEmbed(this);
	}
}
