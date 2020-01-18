import { DMChannel } from "./DMChannel";
import { TextChannel } from "./TextChannel";
import { VoiceChannel } from "./VoiceChannel";

export type Channel = GuildChannel | DMChannel;
export type GuildChannel = TextChannel | VoiceChannel;
