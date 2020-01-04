import { Document, model, Schema } from "mongoose";

export interface Guild extends Document {
	_id: string;
	default_end_time?: string;
	default_reason?: string;

	error_log_channel?: string;
	mod_channel?: string;
	normal_log_channel?: string;
	vc_log_channel?: string;

	special_vc?: string[];

	permissions?: {
		users?: { [x: string]: number };
		roles?: { [x: string]: number };
	};
}

const GuildSchema: Schema = new Schema(
	{
		_id: { type: String },
		default_end_time: { type: String },
		default_reason: { type: String },

		error_log_channel: { type: String },
		mod_channel: { type: String },
		normal_log_channel: { type: String },
		vc_log_channel: { type: String },

		special_vc: [String],
	},
	{ versionKey: false },
);

// Export the model and return your Guild interface
export const GuildModel = model<Guild>("Guild", GuildSchema);
