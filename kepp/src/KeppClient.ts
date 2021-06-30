import { VixieClient } from "vixie";

import { Utility } from "./modules/utility";

export class KeppClient extends VixieClient {
	constructor() {
		super({ loggerPrefix: "kepp", prefix: "!" });
		// set logger level
		this.logger.level = "debug";
		// register modules
		this.registerModule(Utility);
	}

	async login(token: string): Promise<string> {
		this.logger.info("Connecting to Discord...");
		// call super
		super.login(token);
		this.logger.info("Ready.");
		return token;
	}
}
