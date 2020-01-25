import { command, Context, Module } from '../../../../packages/snepsek/src';

export class HelpModule extends Module {
	@command()
	async help(ctx: Context) {
		ctx.reply('e');
	}
}
