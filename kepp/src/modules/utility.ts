import { KeppClient } from "src/KeppClient";
import { Context, Module, ModuleCommand } from "vixie";

export class Utility extends Module {
	constructor(readonly client: KeppClient) {
		super(client, { name: "utility" });
	}

	@ModuleCommand({ name: "hello", aliases: [] })
	hello(ctx: Context): void {
		ctx.reply("Hi!");
	}
}
