import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";

import { resolvers } from "@generated/type-graphql";
import { PrismaClient, User } from "@prisma/client";

/**
 * A common database client for interacting with the Kepp database.
 */
export class KeppDbClient {
	/**
	 * The prisma client used on this database instance.
	 */
	readonly prisma = new PrismaClient();

	/**
	 * Builds a GraphQL schema.
	 */
	async buildGraphQlSchema(): Promise<GraphQLSchema> {
		return await buildSchema({
			resolvers,
			validate: false,
		});
	}

	/**
	 * Fetch a user with the target ID.
	 * @param id
	 * @returns
	 */
	async fetchUser(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id: BigInt(id) } });
	}
}
