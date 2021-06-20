import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import { createLogger, Logger } from "winston";
import { Console } from "winston/lib/winston/transports";

import { KeppDbClient } from "@kepp/database";
import { Partional } from "@kepp/shared";

import { DEFAULT_MIDDLEWARE, defaultNotFoundHandler } from "./middleware";

interface ServerOptions {
	level: string;
	port: number;

	enablePlayground: boolean;
}

const DEFAULT_OPTIONS: ServerOptions = {
	level: "info",
	port: 8080,
	enablePlayground: false,
};

/**
 * A generic HTTP server with a Prisma database backend.
 */
export class KeppServer {
	/**
	 * The prisma database backend.
	 */
	readonly db = new KeppDbClient();

	/**
	 * The options for this prisma server instance.
	 */
	readonly options: ServerOptions;

	/**
	 * The Express application used for handling requests.
	 */
	readonly express = express();

	/**
	 * The HTTP server used for serving requests.
	 */
	readonly http = createServer(this.express);

	/**
	 * The winston logger used for logging to console.
	 */
	readonly logger: Logger;

	constructor(options?: Partional<ServerOptions>) {
		// configure default options.
		this.options = { ...DEFAULT_OPTIONS, ...options };
		// create the winston logger
		this.logger = createLogger({ transports: [new Console()], level: this.options.level });
	}

	/**
	 * Set up the prisma database backend.
	 */
	async setupDatabase(): Promise<void> {
		// build the schema
		this.logger.debug("Building GraphQL schema...");
		const schema = await this.db.buildGraphQlSchema();
		// create the apollo server
		this.logger.debug("Attaching GraphQL middleware...");
		const server = new ApolloServer({
			schema,
			playground: this.options.enablePlayground,
			introspection: this.options.enablePlayground,
			// declare prisma as context
			context: () => ({ prisma: this.db.prisma }),
		});
		server.applyMiddleware({ app: this.express });
	}

	/**
	 * Set up application middleware.
	 */
	setupMiddleware(): void {
		// iterate over default middleware and apply
		DEFAULT_MIDDLEWARE.forEach((m) => m(this));
	}

	/**
	 * Start the server listening on the target port.
	 */
	async listen(): Promise<void> {
		// setup prisma
		await this.setupDatabase();
		// add default not found handler
		this.express.use(defaultNotFoundHandler);
		// start listening on port specified in options.
		this.logger.info("Listening on port " + this.options.port);
		this.http.listen(this.options.port);
	}
}
