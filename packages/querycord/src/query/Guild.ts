import { Guild } from "../structures/Guild";
import { Query, QueryTypes } from "./Query";

export class GuildQuery extends Query<Guild> {
	constructor(readonly target: string) {
		super(QueryTypes.Message, target);
	}
}
