import { Context } from '../../../packages/snepsek/src/Command';
import { command, Module } from '../../../packages/snepsek/src/Module';

export class Curl extends Module {
	@command()
	async curl(ctx: Context) {}

	async moduleDidInit() {}
}
