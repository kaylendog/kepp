import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Server } from "http";
import mongoose from "mongoose";
import morgan from "morgan";
import { env } from "~/env";

import { KeppAPI } from "../KeppAPI";
import { Logger } from "../util/logging";
import * as Errors from "./errors";
import { routes } from "./routes";

interface FoxServerConfig {
	port: number;
}

const DEFAULT_SERVER_CONFIG: FoxServerConfig = {
	port: env.BACKEND_PORT,
};

/**
 * Basic wrapper around an express server.
 */
export class FoxServer {
	public readonly logger = new Logger("http");
	public readonly config: FoxServerConfig = DEFAULT_SERVER_CONFIG;

	public readonly express: express.Application = express();
	public readonly http: Server = new Server(this.express);

	constructor(
		readonly global: KeppAPI,
		config: Partial<FoxServerConfig> = DEFAULT_SERVER_CONFIG,
	) {
		this.config = { ...DEFAULT_SERVER_CONFIG, ...config };

		// Middleware
		this.express
			.use(cors())
			.use(bodyParser.json())
			.use(
				morgan("dev", {
					stream: { write: (msg) => this.logger.debug(msg) },
				}),
			);

		// HTTP event handlers
		this.http
			.on("error", (err) => this.logger.error(err))
			.on("close", () => this.logger.warn("HTTP server closed."))
			.on("listening", () =>
				this.logger.info("FoxServer listening on", this.config.port),
			);

		this.registerRoutes();
	}

	/**
	 * Register server routes.
	 */
	registerRoutes() {
		routes.forEach((route) => {
			this.logger.debug(
				"Register route:",
				route.method.toUpperCase(),
				route.path,
			);
			this.express[route.method](route.path, route.handler(this));
		});

		this.express
			.all("/", (req, res) =>
				res.json({
					v: require("../../package.json").version,
					uptime: Math.floor(process.uptime()),
				}),
			)
			.use((req, res) => Errors.NotFound(res));
	}

	start() {
		this.http.listen(this.config.port);
	}
}

export { Errors };
