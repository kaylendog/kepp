import { ExistExtends } from "../util/types";
import { Channel, GuildChannel } from "./channels";
import { DiscordObject } from "./DiscordObject";
import { Guild } from "./Guild";

export interface Message<T extends Channel> extends DiscordObject {
	content: string;
	guild: ExistExtends<T, GuildChannel, Guild>;
}
