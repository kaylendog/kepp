import { MessageQuery } from '../src/query/Message';
import { GuildChannel } from '../src/structures/channels';

const handler = async (msg: MessageQuery<GuildChannel>) => {
	await msg.content();

	const guild = await msg.guild;
	msg.guild;
};
