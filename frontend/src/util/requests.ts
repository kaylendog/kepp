import Axios from "axios";

export const APIRequestMaker = Axios.create({
	baseURL: process.env.BACKEND_URI
});
