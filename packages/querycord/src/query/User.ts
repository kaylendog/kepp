import { User } from '../structures/User';
import { Query, QueryTypes } from './Query';

type UserResolvable = { id?: string; message?: string };

/**
 * Message Query
 */
export class UserQuery extends Query<User> {
	constructor(readonly target: UserResolvable) {
		super(QueryTypes.Message, target);
	}
}
