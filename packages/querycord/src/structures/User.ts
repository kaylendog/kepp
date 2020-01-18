import { DiscordObject } from "./DiscordObject";

export interface User extends DiscordObject {
	username: string;
	discriminator: string;
	tag: string;
}
