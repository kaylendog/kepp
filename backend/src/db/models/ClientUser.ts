import { Document, model, Schema } from "mongoose";

export interface ClientUser extends Document {
	_id: string;
	access_token: string;

	expires_at: number;
	refresh_token: string;

	token: string;
}

const ClientUserSchema: Schema = new Schema(
	{
		_id: { type: String, required: true },
		access_token: { type: String, required: true },

		expires_at: { type: String, required: true },
		refresh_token: { type: String },

		token: { type: String, required: true },
	},
	{ versionKey: false },
);

// Export the model and return your ClientUser interface
export const ClientUserModel = model<ClientUser>(
	"ClientUser",
	ClientUserSchema,
);
