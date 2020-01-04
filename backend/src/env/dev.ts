import { withDefaults } from "./defaults";

export const dev = withDefaults({
	TOKEN: 'NDMwNDU2MDY4NzI4OTQ2NzA4.XhDyWA.NaQKRVvYFxnDxn1v-qDkYZklQI8',

	// WRITE_PERMISSION_LEVEL: Number(process.env.WRITE_PERMISSION_LEVEL),
	// READ_PERMISSION_LEVEL: Number(process.env.READ_PERMISSION_LEVEL),

	DB_URI: 'mongodb://localhost:27017/kepp',

	BACKEND_PORT: 8080,

	CLIENT_ID: '430456068728946708',
	CLIENT_SECRET: 'n-gTBOm6aVe8GVMJoR10DXK2ihlxMJri',
	REDIRECT_URI: 'http://localhost:3000/auth/redirect',
	SCOPE: 'identify%20guilds'
});
