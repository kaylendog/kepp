import { withDefaults } from "./defaults";

export const prod = withDefaults({
	TOKEN: process.env.TOKEN,

	WRITE_PERMISSION_LEVEL: Number(process.env.WRITE_PERMISSION_LEVEL),
	READ_PERMISSION_LEVEL: Number(process.env.READ_PERMISSION_LEVEL),

	DB_URI: `${process.env.ENABLE_SRV ? "mongodb+srv" : "mongodb"}://${
		process.env.DB_USER && process.env.DB_PASS
			? `${process.env.DB_USER}:${process.env.DB_PASS}@`
			: ""
	}${process.env.MONGO_URI}`,

	BACKEND_PORT: Number(process.env.BACKEND_PORT),

	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
	REDIRECT_URI: process.env.REDIRECT_URI,
	SCOPE: process.env.SCOPE,
});
