import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { resolvers } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";

import { DEFAULT_OPTIONS as DEFAULT_SERVER_OPTIONS, Server, ServerOptions } from "./server";
import { Partional } from "./types";

interface PrismaServerOptions extends ServerOptions {
	enablePlayground: boolean;
}

const DEFAULT_OPTIONS: PrismaServerOptions = {
	...DEFAULT_SERVER_OPTIONS,
	enablePlayground: false,
};

/**
 * A generic HTTP server with a Prisma database backend.
 */
export class WithPrismaServer<T extends WithPrismaServer<T>> extends Server<T> {
	/**
	 * The prisma database backend.
	 */
	readonly prisma = new PrismaClient();

	/**
	 * The options for this prisma server instance.
	 */
	declare readonly options: PrismaServerOptions;

	constructor(options: Partional<PrismaServerOptions & ServerOptions>) {
		super({ ...DEFAULT_OPTIONS, ...options });
		// add prisma listener
		this.beforeListen(async () => await this.setupPrisma());
	}

	/**
	 * Set up the prisma database backend.
	 */
	async setupPrisma() {
		this.logger.verbose("Setting up prisma database...");
		// connect to database
		await this.prisma.$connect();
		// build the schema
		this.logger.debug("Building graphql schema...");
		const schema = await buildSchema({
			resolvers,
			validate: false,
		});
		// create the apollo server
		this.logger.debug("Attaching graphql middleware...");
		const server = new ApolloServer({
			schema,
			playground: true,
			introspection: true,
			// declare prisma as context
			context: () => ({ prisma: this.prisma }),
		});
		server.applyMiddleware({ app: this.express });
	}
}
