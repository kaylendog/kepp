import { Channel } from "../structures/channels";
import { Guild } from "../structures/Guild";
import { Message } from "../structures/Message";
import { User } from "../structures/User";

type Queryable = Message<Channel> | Guild | User | Channel;

export enum QueryTypes {
	Guild = "GUILD",
	Message = "MESSAGE",
	Channel = "CHANNEL",
}

export abstract class Query<T extends Queryable> {
	constructor(
		protected readonly type: QueryTypes,
		protected readonly target: {}
	) {}

	/**
	 * Execute the query.
	 */
	async exec(): Promise<T> {
		return {} as T;
	}

	/**
	 * Allow queries to be awaited, returning the target object.
	 */
	then: Promise<T>["then"] = async (resolve, reject) => {
		return this.exec().then(resolve, reject);
	};
}
