import { config } from "dotenv";

import { KeppServer } from "./server";

// configure environment
config();

new KeppServer({ level: "silly", enablePlayground: true }).listen();
