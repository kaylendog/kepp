import { Client, Command } from 'eris';

import { Context } from '../src/Command';
import { command, Module } from '../src/Module';

export class Test extends Module {
	constructor(c: Client) {
		super(c);
	}

	a = 1;

	@command()
	async test(context: Context) {
		console.log('commaned executed!');
	}
}
