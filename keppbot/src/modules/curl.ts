import { Context } from '../lib/Command';
import { command, Module } from '../lib/Module';

export class Curl extends Module {
	@command()
	async curl(ctx: Context) {}

	async moduleDidInit() {}
}
