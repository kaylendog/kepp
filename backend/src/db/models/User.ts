import { Document, model, Schema, SchemaTypes } from "mongoose";

export interface User extends Document {
	_id: string;

	avatar: string;
	tag: string;

	guilds: [
		{
			features: [];
			icon: string;
			id: string;
			name: string;
			owner: boolean;
			permissions: number;
		},
	];
}

const UserSchema: Schema = new Schema(
	{
		_id: { type: String, required: true },

		avatar: { type: String, required: true },
		tag: { type: String, required: true },

		guilds: [{}],
	},
	{ versionKey: false },
);

// Export the model and return your User interface
export const UserModel = model<User>("User", UserSchema);
