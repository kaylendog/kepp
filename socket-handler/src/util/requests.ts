import axios from "axios";

export const RequestMaker = axios.create({
	baseURL: "https://discordapp.com/api/v6",
});
