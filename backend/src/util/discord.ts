import { makeAuthenticatedRequest } from "./requests";

/**
 * Fetch a guild member's roles.
 * @param guildID The guild ID
 * @param memberID The guild member ID
 */
export const fetchGuildMemberRoles = async (
	guildID: string,
	memberID: string,
): Promise<string[]> => {
	return JSON.parse(
		await makeAuthenticatedRequest(
			"GET",
			`/guilds/${guildID}/members/${memberID}`,
		).catch(() => {
			return "[]";
		}),
	);
};
