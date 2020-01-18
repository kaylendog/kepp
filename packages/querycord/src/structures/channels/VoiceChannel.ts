import { Guild } from "../Guild";
import { BaseChannel } from "./BaseChannel";

export interface VoiceChannel extends BaseChannel {
	guild: Guild;
}
