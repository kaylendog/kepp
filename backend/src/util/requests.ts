import { default as axios, Method } from "axios";

const TOKEN = process.env.TOKEN;
const API_ENDPOINT = "https://discordapp.com/api";

export const makeAuthenticatedRequest = async (
	method: Method,
	endpoint: string,
) => {
	if (!TOKEN) {
		throw Error(
			"Required environment variable 'token' has not been specified.",
		);
	}

	const res = await axios(`${API_ENDPOINT}${endpoint}`, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
		},
		method,
	});

	return res.data;
};

export const makeUserAuthenticatedRequest = async (
	method: Method,
	endpoint: string,
	token: string,
) => {
	const res = await axios(`${API_ENDPOINT}${endpoint}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		method,
	});

	return res.data;
};

/**
 * Fetch a discord user
 */
export const fetchCurrentUser = <T extends any>(token: string) =>
	makeUserAuthenticatedRequest("GET", "/users/@me", token) as Promise<T>;

/**
 * Fetch a discord user's current guilds
 */
export const fetchCurrentUserGuilds = <T extends any>(token: string) =>
	makeUserAuthenticatedRequest("GET", "/users/@me/guilds", token) as Promise<
		T
	>;
