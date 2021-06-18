import express from "express";
import { createServer } from "http";
import { createLogger, Logger } from "winston";
import { Console } from "winston/lib/winston/transports";

import {
	defaultNotFoundHandler,
	MiddlewareHandler as ServerHandler,
	useHelmet,
	useJsonBodyParsing,
	useMorgan,
} from "./middleware";
import { Partional } from "./types";

/**
 * An interface of available server options.
 */
export interface ServerOptions {
	level: string;
	port: number;
}

/**
 * The default server options.
 */
export const DEFAULT_OPTIONS: ServerOptions = {
	port: 8080,
	level: "http",
};

/**
 * A generic HTTP server implementation.
 */
export class Server<T extends Server<T>> {
	/**
	 * The server options. Used when creating the HTTP listener.
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

	readonly beforeListenHandlers: ServerHandler<T>[] = [];

	constructor(options: Partional<ServerOptions>) {
		// configure default options.
		this.options = { ...DEFAULT_OPTIONS, ...options };
		// create the winston logger
		this.logger = createLogger({ transports: [new Console()], level: this.options.level });
	}

	/**
	 * Add a method to run before the server starts listening.
	 * @param handlers An array of handlers to run before the server starts listening
	 */
	beforeListen(...handlers: ServerHandler<T>[]) {
		this.beforeListenHandlers.push(...handlers);
		return this;
	}

	/**
	 * Add middleware to this server.
	 * @param handler The middleware adder to run.
	 */
	addMiddleware(...handlers: ServerHandler<T>[]) {
		// iterate over handlers an execute
		handlers.forEach((v) => v(this as unknown as T));
		return this;
	}

	/**
	 * Set up the express application, plus any extra middleware.
	 */
	useDefaultMiddleware() {
		// add middleware
		this.addMiddleware(useMorgan, useHelmet, useJsonBodyParsing);
		return this;
	}

	/**
	 * Start the server listening on the target port.
	 */
	async listen() {
		// override listen handlers.
		for (const handler of this.beforeListenHandlers) {
			await handler(this as unknown as T);
		}
		// add default not found handler
		this.addMiddleware(defaultNotFoundHandler);

		// start listening on port specified in options.
		this.logger.info("Listening on port " + this.options.port);
		this.http.listen(this.options.port);
	}
}
