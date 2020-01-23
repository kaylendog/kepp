import { command, Context, Module } from '../../../packages/snepsek/src/';

export class Curl extends Module {
	@command({ disabled: false, inhibitors: [] })
	async curl(ctx: Context) {}

	async moduleDidInit() {
		this.logger.info(`Curl module initialized.`);
	}
}
