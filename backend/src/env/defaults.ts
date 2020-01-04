export interface Environment {
	TOKEN: string;
	WRITE_PERMISSION_LEVEL: number;
	READ_PERMISSION_LEVEL: number;
	DB_URI: string;
	BACKEND_PORT: number;

	CLIENT_ID: string;
	REDIRECT_URI: string;
	SCOPE: string;
	CLIENT_SECRET: string;

	WS_PORT: number;
}

const DEFAULT_ENVIRONMENT: Environment = {
	TOKEN: "",
	WRITE_PERMISSION_LEVEL: 2,
	READ_PERMISSION_LEVEL: 1,
	DB_URI: "",
	BACKEND_PORT: 8080,

	CLIENT_ID: "",
	REDIRECT_URI: "",
	SCOPE: "",
	CLIENT_SECRET: "",

	WS_PORT: 6879,
};

export const withDefaults = (env: Partial<Environment>): Environment => ({
	...DEFAULT_ENVIRONMENT,
	...env,
});
