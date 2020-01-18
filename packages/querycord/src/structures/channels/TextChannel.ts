import { Guild } from "../Guild";
import { BaseChannel } from "./BaseChannel";

export interface TextChannel extends BaseChannel {
	guild: Guild;
}
