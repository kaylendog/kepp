import { config } from "dotenv";

import { KeppClient } from "./KeppClient";

// load environment configuration
config();
// ensure env is set
if (process.env.NODE_ENV === undefined) {
	process.env.NODE_ENV = "development";
}
if (!process.env.ACCESS_TOKEN) {
	throw new Error("Access token not specified.");
}

// create the client and login
new KeppClient().login(process.env.ACCESS_TOKEN);
